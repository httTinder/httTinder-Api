import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userProfile } from "../../../entities/user_profile";
import { AppError } from "../../../errors/AppError";
import { IUserProfileUpdateRequest } from "../../../interfaces/user/user_profile";

const updateUserProfileService = async (
  userData: IUserProfileUpdateRequest,
  id: string
) => {
  const userRepository = AppDataSource.getRepository(user);
 
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const profileRepositoy = AppDataSource.getRepository(userProfile); 

  if (!findUser.profile) {
    profileRepositoy.create(userData);

    userData = await profileRepositoy.save(userData);

    userRepository.update(findUser.id, { profile: userData });
    
    return;
  }

  profileRepositoy.update(findUser.profile.id, { ...userData });
  return;
};

export default updateUserProfileService;
