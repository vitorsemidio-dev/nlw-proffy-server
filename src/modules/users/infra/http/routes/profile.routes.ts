import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProfileController from '../controllers/ProfileController';
import ProfileAvatarController from '../controllers/ProfileAvatarController';

const profileRouter = Router();
const upload = multer(uploadConfig);
const profileController = new ProfileController();
const profileAvatarController = new ProfileAvatarController();

profileRouter.put('/', profileController.update);
profileRouter.patch(
  '/avatar',
  upload.single('avatar'),
  profileAvatarController.update,
);

export default profileRouter;
