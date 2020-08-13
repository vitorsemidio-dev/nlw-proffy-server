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

    const trx = await db.transaction();

    const data = {
      name,
      lastname,
      email,
      password,
      avatar: 'empty avatar',
      whatsapp: 'empty whatsapp',
      bio: 'empty bio',
    };

    const user = await trx.insert(data);

    console.log(user);

    trx.commit();

    return new Promise(resolve =>
      resolve({
        name,
        lastname,
        email,
        password,
      }),
    );
  }
}
