import { Request, Response } from 'express';

import CreateUsersService from '../services/CreateUsersService';

const createUsersService = new CreateUsersService();

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
      return response.json({
        error: err.message,
      });
    }
  }
}
