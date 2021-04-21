import { getCustomRepository, Repository } from 'typeorm';

import Setting from '../../models/settings/Setting';

import SettingsRepository from '../../repositories/settings/SettingsRepository';

interface Request {
  chat: boolean;
  username: string;
}

export default class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  public async execute({ chat, username }: Request): Promise<Setting> {
    // Select * from settings where username = "username" limit 1
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error('This users already exists !');
    }

    const settings = this.settingsRepository.create({ chat, username });

    await this.settingsRepository.save(settings);

    return settings;
  }
}
