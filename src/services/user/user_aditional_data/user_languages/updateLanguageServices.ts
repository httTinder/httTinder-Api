import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { AppError } from "../../../../errors/AppError";
import { IUserAddLanguage } from "../../../../interfaces/user/user_additionalData/userLanguages";
import { userLanguages } from "../../../../entities/user_aditional_data/user_languages";
const updateLanguagesSelection = async (languages:IUserAddLanguage , id:string)=>{
    
    const { language } = languages;

    if(!language){
        throw new AppError (404,"Index not found")
    }

    const userRepository = AppDataSource.getRepository(user);
    const userUpdate = await userRepository.findOneBy ({id});

    if(!userLanguages){
        throw new AppError (404,"User not found")
    }

    const userAditionalRepository = AppDataSource.getRepository(userAditionalData)
    const languageRepository = AppDataSource.getRepository(userLanguages)



}

export default updateLanguagesSelection
