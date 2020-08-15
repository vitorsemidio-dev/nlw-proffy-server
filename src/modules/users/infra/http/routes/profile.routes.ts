import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.put('/', profileController.update);

export default profileRouter;
