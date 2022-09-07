import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";

const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(user);

  const userDelete = await userRepository.findOneBy({ id });

  if (!userDelete) {
    throw new AppError(404, "User not found");
  }
  if (userDelete.isActive === false) {
    throw new AppError(400, "User not is active");
  }
  userRepository.update(userDelete!.id,{isActive:false})


};

export default userDeleteService
