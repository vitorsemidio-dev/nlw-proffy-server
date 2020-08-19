import { Request, Response } from 'express';

import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';

const forgotPasswordService = new ForgotPasswordService();

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;

      const token = await forgotPasswordService.execute({ email });
      return response.json({ token });
    } catch (err) {
      return response.status(404).json({
        message: err.message,
      });
    }
  }
}
