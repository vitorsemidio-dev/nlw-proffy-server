import { Request, Response } from 'express';

import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import SessionsService from '@modules/users/services/SessionsService';

const bCryptHashProvider = new BCryptHashProvider();
const sessionsService = new SessionsService(bCryptHashProvider);

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      await sessionsService.execute({
        email,
        password,
      });

      return response.status(200).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
