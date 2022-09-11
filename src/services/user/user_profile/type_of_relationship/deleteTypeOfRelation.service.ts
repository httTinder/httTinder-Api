import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { typeOfRelationship } from "../../../../entities/user_profile/type_of_relationship";
import { AppError } from "../../../../errors/AppError";

const deleterelationShipService = async (id:string)=>{
    const userRepository = AppDataSource.getRepository(user);

    const relationRepository = AppDataSource.getRepository(typeOfRelationship)

    const userFind = await userRepository.findOneBy({id})

    if(!userFind){
        throw new AppError(404, "User not found");
    }

    const findRelation = relationRepository.findOne({where : { id : userFind.profile.lookingFor.id}})

    if(!findRelation){
        throw new AppError(404, "Type of relationship not found");
    }
        
    await relationRepository.delete({id:userFind.profile.typeOfRelationship.id});
   
    return 
}
export default deleterelationShipService
