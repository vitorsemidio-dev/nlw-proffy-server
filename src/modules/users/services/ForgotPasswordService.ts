import db from '@shared/infra/knex/connections';

interface IRequest {
  email: string;
}

export default class ForgotPasswordService {
  public async execute({ email }: IRequest): Promise<number> {
    const trx = await db.transaction();
    try {
      const token = Math.floor(Math.random() * 1000);

      const user = await trx
        .select('*')
        .from('users')
        .where('email', email)
        .first();

      if (!user) {
        throw new Error('User does not exist');
      }

      await trx('tokens').where('user_id', user.id).delete();

      console.log(user);

      await trx('tokens').insert({
        token,
        user_id: user.id,
      });

      trx.commit();

      return token;
    } catch (err) {
      trx.rollback();
      throw new Error('Fail to forgot password');
    }
  }
}
