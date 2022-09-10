import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userMusicGenre } from "../../../../entities/user_aditional_data/user_music_genre";
import { AppError } from "../../../../errors/AppError";
import { userAdditionalData } from "../../../../entities/user_aditional_data";

import { IUserMusic } from "../../../../interfaces/user/user_aditional_data/user_music";

export const updateUserMusicService = async (
  musicData: IUserMusic,
  userId: string
): Promise<string> => {
  const userRepository = AppDataSource.getRepository(user);

  const userMusicRepository = AppDataSource.getRepository(userMusicGenre);

  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);

  const { uuid } = musicData;
  const music = musicData.music;
  const idToSearch = musicData.uuid;
  //throw new AppError(200, `${uuid}`);
  if (!music) {
    throw new AppError(404, "Invalid field");
  }

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (findUser!.userAdditionalData === null) {
    throw new AppError(404, "you must submit additional data first");
  }

  const findMusic = await userMusicRepository.findOneBy({ id: idToSearch });

  if (!findMusic && uuid) {
    throw new AppError(
      404,
      `the ${uuid} of the music genre sent was not found`
    );
  }

  if (findMusic?.id == uuid) {
    await userMusicRepository.update(findMusic!.id, { name: music });

    return `musical gender '${music}' updated`;
  }

  const findAddData = await userAddDataRepository.findOne({
    where: { id: findUser?.userAdditionalData?.id },
  });

  const newMusic = userMusicRepository.create({
    name: music,
    userAdditionalData: findAddData!,
  });

  await userMusicRepository.save(newMusic);

  return `musical gender was created`;
};
