import { lookingFor } from "./../../../../entities/user_profile/looking_for/index";
import { AppError } from "./../../../../errors/AppError";
import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userProfile } from "../../../../entities/user_profile";

export const deleteLookingForService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(user);

  const profileRepository = AppDataSource.getRepository(userProfile);

  const lookingForRepository = AppDataSource.getRepository(lookingFor);

  const userFind = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!userFind) {
    throw new AppError(404, "User not found");
  }

  const findProfile = await profileRepository.findOneBy({
    id: userFind?.profile?.id,
  });

  if (!findProfile) {
    throw new AppError(404, "profile not found");
  }

  const lookToDelete = await lookingForRepository.delete({
    id: findProfile.lookingFor.id,
  });

  if (lookToDelete.affected == 0) {
    throw new AppError(404, "looking for not found");
  }

  return;
};
