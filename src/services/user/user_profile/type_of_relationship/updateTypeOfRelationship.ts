import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { AppError } from "../../../../errors/AppError";
import { IUserUpdateRelationReq } from "../../../../interfaces/user/user_profile/user_relationship";
import { typeOfRelationship } from "../../../../entities/user_profile/type_of_relationship";
import { userProfile } from "../../../../entities/user_profile";
import { IUserProfileUpdateRequest } from "../../../../interfaces/user/user_profile";
const updateRelationShip = async (
  relation: IUserUpdateRelationReq,
  id: string
) => {
  const { friendship, casual, serious } = relation;

  if (!friendship && !casual && !serious) {
    throw new AppError(404, "one must be true");
  }

  if (
    friendship === undefined &&
    casual === undefined &&
    serious === undefined
  ) {
    throw new AppError(400, "Review required fields");
  }

  const userRepository = AppDataSource.getRepository(user);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  if (findUser.profile.id == null) {
    throw new AppError(404, "create profile is required");
  }

  const userProfileRepository = AppDataSource.getRepository(userProfile);

  const findProfile = await userProfileRepository.findOne({
    where: { id: findUser.profile.id },
  });

  const relationRepository = AppDataSource.getRepository(typeOfRelationship);

  if (findProfile!.typeOfRelationship !== null) {
    await relationRepository.update(findProfile!.lookingFor, {
      friendship,
      casual,
      serious,
    });

    return;
  }

  const newRelation = relationRepository.create({
    friendship,
    casual,
    serious,
  });

  await relationRepository.save(newRelation);

  await userProfileRepository.update(findUser!.profile, {
    typeOfRelationship: newRelation,
  });

  return;
};

export default updateRelationShip;
