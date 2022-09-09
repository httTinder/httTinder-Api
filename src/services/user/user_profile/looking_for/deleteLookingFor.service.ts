import { lookingFor } from "./../../../../entities/user_profile/looking_for/index";
import { AppError } from "./../../../../errors/AppError";
import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";

export const deleteLookingForService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(user);
  
  const lookingForRepository = AppDataSource.getRepository(lookingFor);

  const userFind = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!userFind) {
    throw new AppError(404, "User not found");
  }

  await lookingForRepository.delete({ id: userFind.profile.lookingFor.id });

  return;
};
