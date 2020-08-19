import db from '@shared/infra/knex/connections';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: number;
  avatarFilename: string;
}

export default class UpdateProfileAvatarService {
  constructor(private storageProvider: IStorageProvider) {}

  public async execute({ avatarFilename, user_id }: IRequest): Promise<void> {
    const user = await db
      .select('*')
      .from('users')
      .where('user_id', user_id)
      .first();

    if (!user) {
      throw new Error('User does not exist');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    await db('users').where('id', '=', user_id).update('avatar', filename);
  }
}
