import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import { IUserEditRequest } from "../../interfaces/user";
import { compareSync } from "bcryptjs";

const userEditService = async (
  id: string,
  data: IUserEditRequest
): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(user);

  const { password, ...rest } = data;

  const userFind = await userRepository.findOne({ where: { id } });
  
  if (!userFind) {
    throw new AppError(404, "user not found");
  }

  if (data.password !== undefined) {
    throw new AppError(404, "password cannot be changed on this route");
  }

  if (data.email !== undefined) {
    throw new AppError(404, "email cannot be changed on this route");
  }

  await userRepository.update(userFind!.id, {name: data.name, age: data.age})

  return true
};

export default userEditService;
