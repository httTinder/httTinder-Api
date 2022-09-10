import { AppError } from "../../../../errors/AppError";
import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userMusicGenre } from "../../../../entities/user_aditional_data/user_music_genre";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { IUserMusic } from "../../../../interfaces/user/user_aditional_data/user_music";

export const updateUserMusicService = async (
  musicData: IUserMusic,
  userId: string
): Promise<string> => {
  const userRepository = AppDataSource.getRepository(user);

  const userMusicRepository = AppDataSource.getRepository(userMusicGenre);

  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);

  const music = musicData.music;
  const idToSearch = musicData.uuid;

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

  if (!findMusic && idToSearch) {
    throw new AppError(
      404,
      `the '${idToSearch}' of musical genres sent was not found`
    );
  }

  if (findMusic?.id == idToSearch) {
    await userMusicRepository.update(findMusic!.id, { name: music });

    return `musical gender: '${music}' updated successfully`;
  }

  const findAddData = await userAddDataRepository.findOne({
    where: { id: findUser?.userAdditionalData?.id },
  });

  const newMusic = userMusicRepository.create({
    name: music,
    userAdditionalData: findAddData!,
  });

  await userMusicRepository.save(newMusic);

  return "musical gender was created successfully";
};
