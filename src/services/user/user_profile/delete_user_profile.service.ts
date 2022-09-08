import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userProfile } from "../../../entities/user_profile";
import { AppError } from "../../../errors/AppError";

const userDeleteProfileService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(user);

  const userFind = await userRepository.findOneBy({ id });

  if (!userFind) {
    throw new AppError(404, "User not found");
  }

  const profileRepository = AppDataSource.getRepository(userProfile);

  await profileRepository.delete({ id: userFind.profile.id });

  return;
};

export default userDeleteProfileService;
