import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAditionalData } from "../../../../entities/user_aditional_data";
import { userHobbies } from "../../../../entities/user_aditional_data/user_hobbies";
import { userProfile } from "../../../../entities/user_profile";
import { AppError } from "../../../../errors/AppError";
import { IUserHobbies } from "../../../../interfaces/user/user_aditional_data/user_hobbies";

const updateUserHobbiesService = async (userData: IUserHobbies, id: string) => {
  const { name } = userData;
  if (name) {
    throw new AppError(404, "index not found");
  }

  const userRepository = AppDataSource.getRepository(user);
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const dataRepository = AppDataSource.getRepository(userAditionalData);
  const data = await dataRepository.findOneBy({ id: findUser.id });

  if (!data) {
    throw new AppError(404, "user not found");
  }

  const hobbiRepository = AppDataSource.getRepository(userHobbies);
  hobbiRepository.create(userData);
  const hobbie = await hobbiRepository.save(userData);
  if (!data?.hobbies) {
    dataRepository.update(findUser.id, { hobbies: [hobbie] });
    return;
  }

  data.hobbies = [...data?.hobbies, hobbie];

  await dataRepository.save(data);

  return;
};

export default updateUserHobbiesService;
