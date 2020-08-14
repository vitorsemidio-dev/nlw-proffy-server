import { Request, Response } from 'express';

import CreateSubjectsService from '../../../services/CreateSubjectsService';

const createSubjectsService = new CreateSubjectsService();

class SubjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;

      await createSubjectsService.execute({ name });

      return response.status(201).send();
    } catch (err) {
      return response.status(404).json({
        message: err.message,
      });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    return response.json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}

export default SubjectsController;
