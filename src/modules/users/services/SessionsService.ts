import db from '@shared/infra/knex/connections';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProviders';

interface IRequest {
  email: string;
  password: string;
}

export default class SessionsService {
  constructor(private hashProvider: IHashProvider) {}

  public async execute({ email, password }: IRequest): Promise<void> {
    try {
      const user = await db
        .select('*')
        .from('users')
        .where('email', email)
        .first();

      const matchPassword = await this.hashProvider.compareHash(
        password,
        user.password,
      );

      if (!matchPassword) {
        throw new Error('User/Password does not match');
      }
    } catch (err) {
      throw new Error('User/Password does not match');
    }
  }
}
