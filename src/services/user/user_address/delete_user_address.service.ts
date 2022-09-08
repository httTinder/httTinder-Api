import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userAddresses } from "../../../entities/user_address";
import { AppError } from "../../../errors/AppError";

const userDeleteAddressService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(user);

  const userFind = await userRepository.findOneBy({ id });

  if (!userFind) {
    throw new AppError(404, "User not found");
  }

  if (!userFind.address) {
    throw new AppError(404, "User address not found");
  }

  const addressRepository = AppDataSource.getRepository(userAddresses);

  await addressRepository.delete({ id: userFind.address.id });

  return;
};

export default userDeleteAddressService;
