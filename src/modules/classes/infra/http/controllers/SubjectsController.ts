import { Request, Response } from 'express';

class SubjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    return response.json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}

export default SubjectsController;
