import { Repository, EntityRepository } from 'typeorm';

import Setting from '../../models/settings/Setting';

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {}

export default SettingsRepository;
