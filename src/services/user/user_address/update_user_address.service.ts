import AppDataSource from "../../../data-source";
import { IUserAdressRequest } from "../../../interfaces/user/user_address";
import { userAddresses } from "../../../entities/user_address";
import { user } from "../../../entities";
import { AppError } from "../../../errors/AppError";

const updateUserAddressService = async (
  userData: IUserAdressRequest,
  id: string
) => {
  const { city, country, distict, state, zipCode } = userData;
  if (!city || !country || !distict || !state || !zipCode) {
    throw new AppError(404, "index not found");
  }

  if (state.length !== 2) {
    throw new AppError(404, "State index not equal length 2");
  }
  if (zipCode.length !== 8) {
    throw new AppError(404, "ZipCode index not equal length 8");
  }
  const userRepository = AppDataSource.getRepository(user);
  const addressRepository = AppDataSource.getRepository(userAddresses);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  if (!findUser.address) {
    addressRepository.create(userData);
    userData = await addressRepository.save(userData);
    userRepository.update(findUser.id, { address: userData });
    return;
  }

  addressRepository.update(findUser.address.id, { ...userData });

  return;
};

export default updateUserAddressService;
