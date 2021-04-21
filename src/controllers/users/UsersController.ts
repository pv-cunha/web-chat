import { Request, Response } from 'express';

import UsersService from '../../services/users/UsersService';

export default class SettingsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const usersService = new UsersService();

    const user = await usersService.execute({ email });

    return response.json(user);
  }
}
