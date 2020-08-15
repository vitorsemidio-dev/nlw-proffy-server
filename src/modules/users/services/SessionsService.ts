import db from '@shared/infra/knex/connections';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProviders';

interface IRequest {
  email: string;
  password: string;
}

export default class SessionsService {
  constructor(private hashProvider: IHashProvider) {}

  public async execute({ email, password }: IRequest): Promise<void> {
    const userExist = db('users').where('email', '=', email);
    console.log(userExist);

    if (!userExist) {
      throw new Error('User/Password does not match');
    }

    // const passwordHashed = await this.hashProvider.generateHash(password);
    // const matchPassword = await this.hashProvider.compareHash(
    //   userExist.password as string,
    //   passwordHashed,
    // );
  }
}
