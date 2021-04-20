import { Repository, EntityRepository } from 'typeorm';

import Setting from '../models/Setting';

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {}

export default SettingsRepository;
