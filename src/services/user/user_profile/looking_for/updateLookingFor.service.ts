import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userProfile } from "../../../../entities/user_profile";
import { lookingFor } from "../../../../entities/user_profile/looking_for";
import { AppError } from "../../../../errors/AppError";
import { ILookingFor } from "../../../../interfaces/looking_for";

export const updateLookingForService = async (
  data: ILookingFor,
  userId: string
) => {
  const lookingforRepository = AppDataSource.getRepository(lookingFor);

  const userRepository = AppDataSource.getRepository(user);

  const userProfileRepository = AppDataSource.getRepository(userProfile);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  if (!findUser.profile.lookingFor) {
    lookingforRepository.create(data);
    data = await lookingforRepository.save(data);
    userProfileRepository.update(findUser.id, { lookingFor: data });
    return;
  }

  lookingforRepository.update(findUser.profile.lookingFor.id, { ...data });

  return;
};
