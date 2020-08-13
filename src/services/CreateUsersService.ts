import CreateUserDTO from '../dtos/CreateUserDTO';

export default class CreateUsersService {
  public async execute({
    name,
    lastname,
    email,
    password,
  }: CreateUserDTO): Promise<CreateUserDTO> {
    const user = {
      name,
      lastname,
      email,
      password,
    };

    return new Promise(resolve => resolve(user));
  }
}
