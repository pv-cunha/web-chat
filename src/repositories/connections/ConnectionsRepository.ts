import { EntityRepository, Repository } from 'typeorm';

import Connection from '../../models/connections/Connection';

@EntityRepository(Connection)
class ConnectionsRepository extends Repository<Connection> {}

export default ConnectionsRepository;
