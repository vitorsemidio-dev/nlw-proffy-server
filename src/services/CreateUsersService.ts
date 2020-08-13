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
      console.log('email already used');
      return new Promise(resolve =>
        resolve({
          name,
          email,
          password,
          lastname,
        }),
      );
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

    console.log(user);

    return new Promise(resolve => resolve(user));
  }
}
