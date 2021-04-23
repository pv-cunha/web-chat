import { getCustomRepository, Repository } from 'typeorm';

import Connection from '../../models/connections/Connection';

import ConnectionsRepository from '../../repositories/connections/ConnectionsRepository';

export default class FindAllWithoutAdminConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  public async execute(): Promise<Connection[]> {
    const connection = this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });

    return connection;
  }
}
