import { Request, Response } from 'express';

import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import SessionsService from '@modules/users/services/SessionsService';

const bCryptHashProvider = new BCryptHashProvider();
const sessionsService = new SessionsService(bCryptHashProvider);

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    await sessionsService.execute({
      email,
      password,
    });

    return response.json();
  }
}
