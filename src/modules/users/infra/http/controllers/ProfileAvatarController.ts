import { Request, Response } from 'express';

export default class ProfileAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}
