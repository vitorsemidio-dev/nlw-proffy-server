import { Request, Response } from 'express';

import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import UpdateProfileAvatarService from '@modules/users/services/UpdateProfileAvatarService';

const diskStorageProvider = new DiskStorageProvider();
const updateProfileAvatarService = new UpdateProfileAvatarService(
  diskStorageProvider,
);

export default class ProfileAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;
    const avatarFilename = request.file.filename;

    await updateProfileAvatarService.execute({
      user_id,
      avatarFilename,
    });
    return response.json();
  }
}
