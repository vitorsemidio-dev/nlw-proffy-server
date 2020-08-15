import { Request, Response } from 'express';

import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import CreateUsersService from '@modules/users/services/CreateUsersService';

const createUsersService = new CreateUsersService(new BCryptHashProvider());

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, lastname, email, password } = request.body;

    try {
      const user = await createUsersService.execute({
        name,
        lastname,
        email,
        password,
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}
