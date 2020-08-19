import db from '@shared/infra/knex/connections';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProviders';

interface IRequest {
  token: number;
  email: string;
  newPassword: string;
}

export default class ResetPasswordService {
  constructor(private hashProvider: IHashProvider) {}

  public async execute({ token, newPassword, email }: IRequest): Promise<void> {
    const trx = await db.transaction();
    try {
      const checkUser = await trx
        .select('*')
        .from('users')
        .where('email', email)
        .first();

      if (!checkUser) {
        throw new Error('User does not exist');
      }

      const checkToken = await trx
        .select('*')
        .from('tokens')
        .where('user_id', checkUser.id)
        .first();

      if (!checkToken || checkToken.token !== token) {
        throw new Error('Invalid token');
      }

      const passwordHashed = await this.hashProvider.generateHash(newPassword);

      await trx('users')
        .where('email', '=', email)
        .update('password', passwordHashed);

      await trx('tokens').where('user_id', checkUser.id).delete();

      trx.commit();
    } catch (err) {
      trx.rollback();
      throw new Error('Fail to reset password');
    }
  }
}
