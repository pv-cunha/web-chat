import { getCustomRepository, Repository } from 'typeorm';

import Message from '../../models/messages/Message';

import MessagesRepository from '../../repositories/messages/MessagesRepository';

interface Request {
  admin_id?: string;
  text: string;
  user_id: string;
}

export default class CreateMessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  public async execute({ admin_id, text, user_id }: Request): Promise<Message> {
    const message = this.messagesRepository.create({ admin_id, text, user_id });

    await this.messagesRepository.save(message);

    return message;
  }
}
