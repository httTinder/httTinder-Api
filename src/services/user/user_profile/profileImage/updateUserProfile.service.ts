import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { AppError } from "../../../../errors/AppError";
import { compareSync } from "bcryptjs";
import { userImages } from "../../../../entities/user_profile/user_images";
import { userProfile } from "../../../../entities/user_profile";
import { cloudinaryResponse } from "../../../../interfaces/user/user_profile/user_images";

export const updateUserProfileImageService = async (
  userId: string,
  cloudinaryRespo: cloudinaryResponse[] | any
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(user);

  const profileRepository = AppDataSource.getRepository(userProfile);

  if (cloudinaryRespo.length === 0) {
    throw new AppError(400, "invalid required fields");
  }

  if (cloudinaryRespo.length > 1) {
    throw new AppError(400, "invalid required fields");
  }

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(400, "user not found");
  }

  const findProfile = await profileRepository.findOne({
    where: {
      id: findUser?.profile?.id,
    },
  });

  if (!findProfile) {
    throw new AppError(404, "required other profile fields first");
  }

  const url = cloudinaryRespo[0].url;

  const newImage = profileRepository.update(findProfile.id, {
    profileImage: url,
  });

  await profileRepository.save({ id: findProfile.id, profileImage: url });

  return;
};
