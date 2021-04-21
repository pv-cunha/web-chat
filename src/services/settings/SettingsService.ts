import { getCustomRepository } from 'typeorm';

import Setting from '../../models/settings/Setting';

import SettingsRepository from '../../repositories/settings/SettingsRepository';

interface Request {
  chat: boolean;
  username: string;
}

export default class SettingsService {
  public async execute({ chat, username }: Request): Promise<Setting> {
    const settingsRepository = getCustomRepository(SettingsRepository);

    // Select * from settings where username = "username" limit 1
    const userAlreadyExists = await settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error('This users already exists !');
    }

    const settings = settingsRepository.create({ chat, username });

    await settingsRepository.save(settings);

    return settings;
  }
}
