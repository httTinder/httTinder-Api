import AppDataSource from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { userImages } from "../../../../entities/user_profile/user_images";
import { imagesToDeleteBody } from "../../../../interfaces/user/user_profile/user_images";
import { user } from "../../../../entities";

const imageDeleteService = async (
  id: string,
  isAdm: boolean,
  imagesToDelete: imagesToDeleteBody
): Promise<boolean> => {
  if (!imagesToDelete.images || imagesToDelete.images.length === 0) {
    throw new AppError(400, "Review required fields");
  }

  const imagesRepository = AppDataSource.getRepository(userImages);
  const userRepository = AppDataSource.getRepository(user);

  const userFind = await userRepository.findOne({ where: { id } });

  const userImagesFind = await imagesRepository.find({
    where: { userProfile: userFind!.profile },
  });

  imagesToDelete.images.forEach(async (element) => {
    const imageFind = await imagesRepository.findOne({
      where: { id: element },
    });
    if (!imageFind) {
      throw new AppError(404, `image ${element} not found`);
    }
  });

  const verifyPermissions = () => {
    let response = true;
    userImagesFind.forEach((userImages) => {
      imagesToDelete.images.forEach((element) => {
        if (userImages.id == element) {
          response = false;
        }
      });
    });
    return response;
  };

  if (verifyPermissions() && !userFind?.isAdm) {
    throw new AppError(403, "Missing authorization permissions");
  }

  imagesToDelete.images.forEach(async (element) => {
    await imagesRepository.delete({ id: element });
  });

  return true;
};

export default imageDeleteService;
