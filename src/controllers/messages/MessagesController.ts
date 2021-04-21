import { Request, Response } from 'express';

import CreateMessagesService from '../../services/messages/CreateMessagesService';
import ListMessagesService from '../../services/messages/ListMessagesService';

export default class MessagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { admin_id, text, user_id } = request.body;

    const createMessagesService = new CreateMessagesService();

    const message = await createMessagesService.execute({
      admin_id,
      text,
      user_id,
    });

    return response.json(message);
  }

  // localhost:3333/messages/idDoUsuário
  public async showByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const listMessagesService = new ListMessagesService();

    const list = await listMessagesService.execute(id);

    return response.json(list);
  }
}
