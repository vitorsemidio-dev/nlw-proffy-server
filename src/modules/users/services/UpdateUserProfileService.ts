import db from '@shared/infra/knex/connections';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProviders';

interface IRequest {
  user_id: number;
  name: string;
  email: string;
  password: string;
  bio: string;
  whatsapp: string;
  lastname: string;
}

interface User {
  name: string;
}

export default class UpdateUserProfileService {
  constructor(private hashProvice: IHashProvider) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    bio,
    whatsapp,
    lastname,
  }: IRequest): Promise<User> {
    const user = await db('users').where('id', '=', user_id).first();

    if (!user) {
      throw new Error('User does not exist');
    }

    if (email) {
      const checkEmail = await db('users').where('email', '=', email).first();

      if (checkEmail && checkEmail.id !== user_id) {
        throw new Error('E-mail already used');
      }
    }

    let passwordHashed;
    if (password) {
      passwordHashed = this.hashProvice.generateHash(password);
    }

    await db('users')
      .where('id', '=', user_id)
      .update({
        name,
        email,
        password: password ? passwordHashed : user.password,
        bio,
        whatsapp,
        lastname,
      });
  }
}
