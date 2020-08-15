import { Request, Response } from 'express';

import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';

const bCryptHashProvider = new BCryptHashProvider();
const updateUserProfileService = new UpdateUserProfileService(
  bCryptHashProvider,
);

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      name,
      email,
      password,
      bio,
      whatsapp,
      lastname,
    } = request.body;

    try {
      await updateUserProfileService.execute({
        user_id,
        name,
        email,
        password,
        bio,
        whatsapp,
        lastname,
      });
      return response.status(201).send();
    } catch (err) {
      return response.json({
        message: err.message,
      });
    }
  }
}
