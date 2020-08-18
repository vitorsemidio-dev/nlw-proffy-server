import { Request, Response } from 'express';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}
