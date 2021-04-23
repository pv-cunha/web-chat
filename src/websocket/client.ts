import { io } from '../http';

import CreateConnectionsService from '../services/connections/CreateConnectionsService';
import FindBySocketIdConnectionsService from '../services/connections/FindBySocketIdConnectionService';
import FindByUserIdConnectionsService from '../services/connections/FindByUserIdConnectionsService';
import CreateMessagesService from '../services/messages/CreateMessagesService';
import ListMessagesService from '../services/messages/ListMessagesService';
import UsersService from '../services/users/UsersService';
import FindAllWithoutAdminConnectionsService from '../services/connections/FindAllWithoutAdminConnectionsService';

interface Params {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const createConnectionsService = new CreateConnectionsService();
  const usersService = new UsersService();
  const findByUserIdConnectionsService = new FindByUserIdConnectionsService();
  const createMessagesService = new CreateMessagesService();
  const listMessagesService = new ListMessagesService();
  const findBySocketIdConnectionsService = new FindBySocketIdConnectionsService();
  const findAllWithoutAdminConnectionsService = new FindAllWithoutAdminConnectionsService();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as Params;

    const user = await usersService.execute(email);
    const connection = await findByUserIdConnectionsService.execute(user.id);

    // Salvar a conexão com o socket_id, user_id
    if (!connection) {
      await createConnectionsService.execute({ socket_id, user_id: user.id });
    } else {
      connection.socket_id = socket_id;
      await createConnectionsService.execute(connection);
    }

    await createMessagesService.execute({ text, user_id: user.id });

    const allMessages = await listMessagesService.execute(user.id);

    socket.emit('client_list_all_messages', allMessages);

    const allUsers = await findAllWithoutAdminConnectionsService.execute();
    io.emit('admin_list_all_users', allUsers);
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;

    const { user_id } = await findBySocketIdConnectionsService.execute(
      socket.id,
    );

    const message = await createMessagesService.execute({ text, user_id });

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id: socket.id,
    });
  });
});
