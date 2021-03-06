import db from '@shared/infra/knex/connections';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProviders';

import CreateUserDTO from '../dtos/CreateUserDTO';

export default class CreateUsersService {
  constructor(private hashProvider: IHashProvider) {}

  public async execute({
    name,
    lastname,
    email,
    password,
  }: CreateUserDTO): Promise<CreateUserDTO> {
    const emailExists = await db<CreateUserDTO>('users')
      .where({
        email,
      })
      .select();

    if (emailExists.length > 0) {
      throw new Error('Fail to create new user');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const user = await db('users').insert<CreateUserDTO>({
      name,
      lastname,
      email,
      password: passwordHashed,
      avatar: 'empty avatar',
      whatsapp: 'empty whatsapp',
      bio: 'empty bio',
    });

    return user;
  }
}
