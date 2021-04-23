import { io } from '../http';

import FindAllWithoutAdminConnectionsService from '../services/connections/FindAllWithoutAdminConnectionsService';
import FindByUserIdConnectionsService from '../services/connections/FindByUserIdConnectionsService';
import CreateMessagesService from '../services/messages/CreateMessagesService';
import ListMessagesService from '../services/messages/ListMessagesService';

io.on('connect', async (socket) => {
  const findByUserIdConnectionsService = new FindByUserIdConnectionsService();
  const findAllWithoutAdminConnectionsService = new FindAllWithoutAdminConnectionsService();
  const listMessagesService = new ListMessagesService();
  const createMessagesService = new CreateMessagesService();

  const allConnectionsWithoutAdmin = await findAllWithoutAdminConnectionsService.execute();

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin);

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params;

    const allMessages = await listMessagesService.execute(user_id);

    callback(allMessages);
  });

  socket.on('admin_send_message', async (params) => {
    const { user_id, text } = params;

    await createMessagesService.execute({ user_id, text, admin_id: socket.id });

    const { socket_id } = await findByUserIdConnectionsService.execute(user_id);

    io.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id: socket.id,
    });
  });

  socket.on('admin_user_in_support', async (params) => {
    const { user_id } = params;

    await findByUserIdConnectionsService.updateAdminId(user_id, socket.id);

    const allConnectionsWithoutAdmin = await findAllWithoutAdminConnectionsService.execute();

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
  });
});
