import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';

const bCryptHashProvider = new BCryptHashProvider();
const resetPasswordService = new ResetPasswordService(bCryptHashProvider);

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, token, newPassword, newPasswordConfirmation } = request.body;

    try {
      if (newPassword !== newPasswordConfirmation) {
        return response.status(400).json({
          message: 'New Password and Password Confirmation does not match',
        });
      }

      await resetPasswordService.execute({
        token,
        email,
        newPassword,
      });
      return response.json();
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
