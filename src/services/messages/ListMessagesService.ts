import { getCustomRepository, Repository } from 'typeorm';

import Message from '../../models/messages/Message';

import MessagesRepository from '../../repositories/messages/MessagesRepository';

export default class ListMessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  public async execute(user_id: string): Promise<Message[]> {
    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ['user'],
    });

    return list;
  }
}
