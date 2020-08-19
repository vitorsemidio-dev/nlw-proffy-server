import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProfileController from '../controllers/ProfileController';
import ProfileAvatarController from '../controllers/ProfileAvatarController';

const profileRouter = Router();
const upload = multer(uploadConfig);
const profileController = new ProfileController();
const profileAvatarController = new ProfileAvatarController();

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.number().required(),
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      bio: Joi.string(),
      whatsapp: Joi.string(),
      lastname: Joi.string(),
    },
  }),
  profileController.update,
);

profileRouter.patch(
  '/avatar',
  upload.single('avatar'),
  profileAvatarController.update,
);

export default profileRouter;
