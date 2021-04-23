import { Request, Response } from 'express';

import SettingsService from '../../services/settings/SettingsService';

export default class SettingsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;

    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.execute({ chat, username });

      return response.json(settings);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  public async findByUserName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const settings = await settingsService.findByUserName(username);

    return response.json(settings);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { chat } = request.body;

    const settingsService = new SettingsService();

    const settings = await settingsService.update({ username, chat });

    return response.json(settings);
  }
}
