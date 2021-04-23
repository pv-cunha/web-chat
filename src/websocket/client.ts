import { io } from '../http';

import CreateConnectionsService from '../services/connections/CreateConnectionsService';
import FindByUserIdConnectionsService from '../services/connections/FindByUserIdConnectionsService';
import CreateMessagesService from '../services/messages/CreateMessagesService';
import UsersService from '../services/users/UsersService';

interface Params {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const createConnectionsService = new CreateConnectionsService();
  const usersService = new UsersService();
  const findByUserIdConnectionsService = new FindByUserIdConnectionsService();
  const createMessagesService = new CreateMessagesService();

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
  });
});
