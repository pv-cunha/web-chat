import { Router } from 'express';

import SettingsController from '../controllers/settings/SettingsController';
import UsersController from '../controllers/users/UsersController';

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();

routes.post('/settings', settingsController.create);
routes.post('/users', usersController.create);

export default routes;
