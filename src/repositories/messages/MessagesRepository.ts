import { EntityRepository, Repository } from 'typeorm';

import Message from '../../models/messages/Message';

@EntityRepository(Message)
class MessagesRepository extends Repository<Message> {}

export default MessagesRepository;
