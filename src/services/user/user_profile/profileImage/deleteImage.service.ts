import AppDataSource from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { userImages } from "../../../../entities/user_profile/user_images";
import { user } from "../../../../entities";
import { userProfile } from "../../../../entities/user_profile";

export const deleteUserProfileImageService = async (
  userId : string
): Promise<void> => {

  const userRepository = AppDataSource.getRepository(user);

  const profileRepository = AppDataSource.getRepository(userProfile);


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
    throw new AppError(404, "profile image");
  }



  const newImage = profileRepository.update(findProfile.id, {
    profileImage: "null",
  });

  await profileRepository.save({ id: findProfile.id, profileImage: "null" });

  return;
};