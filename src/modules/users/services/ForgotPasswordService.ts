import db from '@shared/infra/knex/connections';

interface IRequest {
  email: string;
}

export default class ForgotPasswordService {
  public async execute({ email }: IRequest): Promise<string> {
    try {
      const token = 'token';

      const user = await db
        .select('*')
        .from('users')
        .where('email', email)
        .first();

      console.log(user);

      return token;
    } catch (_err) {
      throw new Error('User does not exist');
    }
  }
}
