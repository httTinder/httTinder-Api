import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";

const activateUserService = async (tokenEmail: string) => {
  let userId = "";

  const response = await jwt.verify(
    tokenEmail as string,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError(401, "Invalid Token");
      }
      userId = decoded.sub;
    }
  );

  const userRepository = AppDataSource.getRepository(user);

  const findUser = await userRepository.findOneBy({ id: userId });

   if (!findUser) {
     throw new AppError(404, "User not found");
   }

   if (findUser.isActive ===  true) {
    throw new AppError(400, "User already active");
   }

 userRepository.update(findUser!.id, { isActive: true });

  return true;
};

export default activateUserService;
