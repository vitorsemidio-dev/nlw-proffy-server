import db from '../../../shared/infra/knex/connections';

interface IRequest {
  subject_id: number;
  user_id: number;
  cost: number;
}

export default class CreateClassesService {
  public async execute({ subject_id, user_id, cost }: IRequest): Promise<any> {
    // TODO: Check user_id/subject_id
    // TODO: Cost positive
    try {
      const [class_id] = await db('classes').insert({
        user_id,
        subject_id,
        cost,
      });

      return class_id;
    } catch (err) {
      throw new Error('Fail to create class');
    }
  }
}
