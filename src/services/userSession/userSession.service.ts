import jwt from "jsonwebtoken";
import { compare, compareSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import { IUserSession } from "../../interfaces/user/userSession";

const userRepository = AppDataSource.getRepository(user);

export const userSessionService = async ({ email, password }: IUserSession) => {
  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError(403, "Email or Password not match");
  }

  const verifyPassword = compareSync(password, user.password);

  if (!verifyPassword) {
    throw new AppError(403, "Email or Password not match");
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
      isActive: user.isActive,
      id: user.id,
    },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h", subject: user.id }
  );

  return token;
};
