import { getCustomRepository, Repository } from 'typeorm';

import Connection from '../../models/connections/Connection';

import ConnectionsRepository from '../../repositories/connections/ConnectionsRepository';

export default class FindBySocketIdConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  public async execute(socket_id: string): Promise<Connection> {
    const connection = this.connectionsRepository.findOne({
      where: { socket_id },
    });

    return connection;
  }
}
