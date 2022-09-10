import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userProfile } from "../../../../entities/user_profile";
import { lookingFor } from "../../../../entities/user_profile/looking_for";
import { AppError } from "../../../../errors/AppError";
import { ILookingFor } from "../../../../interfaces/looking_for";

export const updateLookingForService = async (
  data: ILookingFor,
  userId: string
) => {
  if (
    !data.age &&
    !data.education &&
    !data.gender &&
    !data.kids &&
    !data.location &&
    !data.pets &&
    !data.smoker &&
    !data.zodiac
  ) {
    throw new AppError(400, "review required fields");
  }

  const regexAge = /[1-9][0-9][-][1-9][0-9]/;

  if (!regexAge.test(data.age)) {
    throw new AppError(400, "age must be 00-00 template");
  }

  if (Number(data.age.split("-")[0]) < 18) {
    throw new AppError(400, "initial age must be > 18");
  }

  const regexZodiac =
    /[Pisces]|[Aries]|[Taurus]|[Gemini]|[Cancer]|[Leo]|[Virgo]|[Libra]|[Scorpio]|[Sagittarius]|[Capricorn]|[Aquarius]/;

  if (!regexZodiac.test(data.zodiac)) {
    throw new AppError(400, "review required fields of zodiac");
  }

  const regexLocation = /[1-9][0-9][0-9][0-9]/;

  if (!regexLocation.test(data.location)) {
    throw new AppError(400, "required location > 1000");
  }

  const regexEducation = /[Ensino Medio Incompleto][Ensino Medio Completo][Ensino Superior Incompleto][Ensino Superior Completo]/

  if (!regexEducation.test(data.education)) {
    throw new AppError(400, "review required fields of education");
  }

  const lookingforRepository = AppDataSource.getRepository(lookingFor);

  const userRepository = AppDataSource.getRepository(user);

  const userProfileRepository = AppDataSource.getRepository(userProfile);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const findProfile = await userProfileRepository.findOneBy({id: findUser.profile.id})

  if (!findUser.profile.lookingFor) {
    lookingforRepository.create(data);

    data = await lookingforRepository.save(data);

    await userProfileRepository.update(findUser.profile.id, { lookingFor: data });

    return;
  }

  await lookingforRepository.update(findUser.profile.lookingFor.id, { ...data });

  return;
};
