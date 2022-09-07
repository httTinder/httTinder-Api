import { lookingFor } from "./../../../../../entities/user_profile/looking_for/index";
import AppDataSource from "../../../../../data-source";
import { user } from "../../../../../entities";
import { AppError } from "../../../../../errors/AppError";
export const updatePetsService = async (
  petData: boolean,
  userId: string
) => {
  const userRepository = AppDataSource.getRepository(user);

  const lookingForRepository = AppDataSource.getRepository(lookingFor);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  lookingForRepository.update(findUser.profile.lookingFor.id, {
    pets: petData,
  });

  return;
};
