import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userHobbies } from "../../../../entities/user_aditional_data/user_hobbies";
import { AppError } from "../../../../errors/AppError";
import { IUserHobbies } from "../../../../interfaces/user/user_aditional_data/user_hobbies";

const updateUserHobbiesService = async (
  hobbieData: IUserHobbies,
  userId: string
): Promise<string> => {
  const userRepository = AppDataSource.getRepository(user);

  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);

  const userHobbieRepository = AppDataSource.getRepository(userHobbies);

  const name = hobbieData.name;
  const idToSearch = hobbieData.uuid;

  if (!name) {
    throw new AppError(404, "Invalid field");
  }

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (findUser!.userAdditionalData === null) {
    throw new AppError(404, "you must submit additional data first");
  }

  const findAddData = await userAddDataRepository.findOne({
    where: { id: findUser?.userAdditionalData?.id },
  });

  if (!findAddData) {
    throw new AppError(404, "you must submit additional data first");
  }

  const findHobbie = await userHobbieRepository.findOneBy({ id: idToSearch });

  if (!findHobbie && idToSearch) {
    throw new AppError(
      404,
      `the '${idToSearch}' of hobbies sent was not found`
    );
  }

  if (findHobbie && idToSearch) {
    userHobbieRepository.update(idToSearch, { name });

    return `Hobbie: '${name}' updated successfully`;
  }

  const newHobbie = userHobbieRepository.create({
    name,
    userAdditionalData: findAddData,
  });

  const hobbie = await userHobbieRepository.save(newHobbie);

  if (!findAddData?.hobbies) {
    userAddDataRepository.update(findUser.id, { hobbies: [hobbie] });
  }

  await userHobbieRepository.save(newHobbie);

  return "Hobbie was created successfully";
};

export default updateUserHobbiesService;
