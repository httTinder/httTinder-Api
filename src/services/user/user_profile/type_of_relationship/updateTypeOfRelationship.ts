import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { AppError } from "../../../../errors/AppError";
import { IUserUpdateRelationReq } from "../../../../interfaces/user/user_profile/user_relationship";
import { typeOfRelationship } from "../../../../entities/user_profile/type_of_relationship";
import { userProfile } from "../../../../entities/user_profile";
import { IUserProfileUpdateRequest } from "../../../../interfaces/user/user_profile";
const updateRelationShip = async (relation: IUserUpdateRelationReq,id: string) => {
  const { friendship, casual, serious } = relation;

  if (!friendship && !casual && !serious) {
    throw new AppError(404, "index not found");
  }

  const userRepository = AppDataSource.getRepository(user);

  const userRelation = await userRepository.findOneBy({ id });

  if (!userRelation) {
    throw new AppError(404, "user not found");
   }

  const relationRepository = AppDataSource.getRepository(typeOfRelationship);

  const userProfileRepository = AppDataSource.getRepository(userProfile)
    
 
  
  console.log(userRelation.profile)
    if (!userRelation.profile.typeOfRelationship) {
      console.log("oi")
      relationRepository.create(relation);
      relation = await relationRepository.save(relation);
      userProfileRepository.update(userRelation.profile.id, { typeOfRelationship:relation });
      return
    }
   
    relationRepository.update(userRelation.profile.typeOfRelationship, { ...relation });

   return;
};

export default updateRelationShip;