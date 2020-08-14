import db from '../../../shared/infra/knex/connections';

interface IRequest {
  name: string;
}

interface IResponse {
  id: number;
  name: string;
}

class CreateSubjectsService {
  public async execute({ name }: IRequest): Promise<IResponse> {
    const subject = await db('subjects').insert<IResponse>({
      name,
    });

    return subject;
  }
}

export default CreateSubjectsService;
