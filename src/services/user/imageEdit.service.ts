import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import { IUserEditRequest } from "../../interfaces/user";
import { compareSync } from "bcryptjs";
import { userImages } from "../../entities/user_profile/user_images";
import { userProfile } from "../../entities/user_profile";
import { cloudinaryResponse } from "../../interfaces/user/user_profile/user_images";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

const imageEditService = async (
  id: string,
  cloudinaryRespo: cloudinaryResponse[] | any
): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(user);
  const profileRepository = AppDataSource.getRepository(userProfile);
  const imagesRepository = AppDataSource.getRepository(userImages);

  const userFind = await userRepository.findOne({ where: { id } });

  if (!userFind) {
    throw new AppError(404, "user not found");
  }

  //const profileFind = await profileRepository.findOne({ where: {id: userFind.id}})

  // if (!profileFind) {
  //   const newProfile = userRepository.create();
  //   await profileRepository.save(newProfile);
  //   await userRepository.update(userFind!.id, {profileId: newProfile.id})
  // }
  let profileId : any = ""
  if (userFind.profile === null) {
    const newProfile = profileRepository.create();
    
    await profileRepository.save(newProfile);
    
    const { id } : any = newProfile;

    profileId = id

    await userRepository.update(userFind!.id, { profile: id });
  }

  await cloudinaryRespo.forEach(async (element: any) => {
    const { url, width, height } = element;

    const newImage = imagesRepository.create({ link: url, width, height, userProfile: profileId });

    await imagesRepository.save(newImage);

    //await imagesRepository.update(userFind!.id, { link: url, width: width, height: height})
  });

  return true;
};

export default imageEditService;
