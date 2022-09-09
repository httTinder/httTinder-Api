import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAditionalData } from "../../../../entities/user_aditional_data";
import { userMusicGenre } from "../../../../entities/user_aditional_data/user_music_genre";
import { AppError } from "../../../../errors/AppError";

import { IUserMusic } from "../../../../interfaces/user/user_aditional_data/user_music";

export const updateUserMusicService = async (
  musicData: IUserMusic,
  userId: string
) => {
  const userRepository = AppDataSource.getRepository(user);
  const userMusicRepository = AppDataSource.getRepository(userMusicGenre);
  const userAddDataRepository = AppDataSource.getRepository(userAditionalData);

  const { music, uuid } = musicData;

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

  const findData = await userAddDataRepository.findOne({
    where: {
      id: findUser.userAditionalData.id,
    },
  });

  if (!findData) {
    throw new AppError(404, "data not found");
  }

  const findMusic = await userMusicRepository.findOne({
    where: {
      id: uuid,
      userAditionalData: findData,
    },
  });

  if (!findMusic) {
    throw new AppError(404, "data not found");
  }

  if (uuid && findMusic !== undefined) {
    userMusicRepository.update(uuid, {
      name: music,
    });
    return;
  }

  const newMusic = await userMusicRepository.save({
    name: music,
    userAditionalData: findData,
  });

  if (!findData?.musicGenre) {
    userAddDataRepository.update(findUser.id, {
      musicGenre: [newMusic],
    });
    return;
  }

  await userAddDataRepository.save(findData);
  
  return;
};
