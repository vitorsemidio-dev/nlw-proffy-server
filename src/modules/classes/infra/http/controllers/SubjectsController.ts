import { Request, Response } from 'express';

import CreateSubjectsService from '../../../services/CreateSubjectsService';

const createSubjectsService = new CreateSubjectsService();

class SubjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const subject = await createSubjectsService.execute({ name });

    return response.json(subject);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    return response.json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}

export default SubjectsController;
