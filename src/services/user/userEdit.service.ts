import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import { IUserEditRequest } from "../../interfaces/user";

const userEditService = async (
  id: string,
  data: IUserEditRequest
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(user);

  const { password, ...rest } = data;

  const userFind = userRepository.findOne({ where: { id } });
  if (!userFind) {
    throw new AppError(404, "user not found");
  }

  await userRepository
    .createQueryBuilder()
    .update({ ...rest })
    .where("id = :id", { id })
    .execute();
};

export default userEditService;
