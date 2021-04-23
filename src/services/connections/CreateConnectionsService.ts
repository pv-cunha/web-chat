import { getCustomRepository, Repository } from 'typeorm';

import Connection from '../../models/connections/Connection';

import ConnectionsRepository from '../../repositories/connections/ConnectionsRepository';

interface ConnectionCreate {
  user_id: string;
  socket_id: string;
  admin_id?: string;
  id?: string;
}

export default class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  public async execute({
    user_id,
    socket_id,
    admin_id,
    id,
  }: ConnectionCreate): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }
}
