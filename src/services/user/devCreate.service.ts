import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRequest } from "../../interfaces/user";
import "dotenv/config";

const devCreateUserService = async ({
  age,
  email,
  name,
  password,
  isAdm = true,
}: IUserRequest): Promise<user> => {
  if (!age || !email || !name || !password) {
    throw new AppError(400, "Review required fields");
  }

  const userRepository = AppDataSource.getRepository(user);

  const emailExist = await userRepository.findOneBy({ email });

  if (emailExist) {
    throw new AppError(409, "Email already exists");
  }

  if (age < 18) {
    throw new AppError(406, "Must be over the age of 18");
  }

  const hashedPassword = await hash(password, 10);

  const newUser = userRepository.create({
    age,
    email,
    name,
    password: hashedPassword,
    isAdm,
    isActive: true,
  });

  await userRepository.save(newUser);

  return newUser;
};

export default devCreateUserService;
