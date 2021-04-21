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
}