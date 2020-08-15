import db from '@shared/infra/knex/connections';

interface IRequest {
  name: string;
}

class CreateSubjectsService {
  public async execute({ name }: IRequest): Promise<void> {
    try {
      await db('subjects').insert({
        name,
      });
    } catch (err) {
      throw new Error('Fail to create new subject');
    }
  }
}

export default CreateSubjectsService;
