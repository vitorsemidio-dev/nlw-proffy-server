import db from '@shared/infra/knex/connections';

interface IRequest {
  email: string;
}

export default class ForgotPasswordService {
  public async execute({ email }: IRequest): Promise<number> {
    const token = Math.floor(Math.random() * 1000);

    const user = await db
      .select('*')
      .from('users')
      .where('email', email)
      .first();

    console.log(user);

    const [token_id] = await db('tokens').insert({
      token,
      user_id: user.id,
    });

    console.log(token_id);

    if (!user) {
      throw new Error('User does not exist');
    }

    return token;
  }
}
