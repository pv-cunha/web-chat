import { getCustomRepository, Repository } from 'typeorm';

import Connection from '../../models/connections/Connection';

import ConnectionsRepository from '../../repositories/connections/ConnectionsRepository';

export default class FindByUserIdConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  public async execute(user_id: string): Promise<Connection> {
    const connection = this.connectionsRepository.findOne({
      where: { user_id },
    });

    return connection;
  }
}
