import { Request, Response } from 'express';

import db from '../../../../../shared/infra/knex/connections';
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

  public async show(request: Request, response: Response): Promise<Response> {
    const { subject_id } = request.params;

    const subject = await db('subjects').where('id', '=', subject_id).first();

    return response.json(subject);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const subjects = await db.select().from('subjects');

    return response.json(subjects);
  }
}

export default SubjectsController;
