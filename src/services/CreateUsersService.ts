import db from '../database/connections';
import CreateUserDTO from '../dtos/CreateUserDTO';

export default class CreateUsersService {
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

    const user = await db('users').insert<CreateUserDTO>({
      name,
      lastname,
      email,
      password,
      avatar: 'empty avatar',
      whatsapp: 'empty whatsapp',
      bio: 'empty bio',
    });

    return user;
  }
}
