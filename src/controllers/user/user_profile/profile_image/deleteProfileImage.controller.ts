import { Request, Response } from "express";
import { deleteUserProfileImageService } from "../../../../services/user/user_profile/profileImage/deleteImage.service";

export const deleteUserProfileImageController = async (req: Request, res: Response) => {
  const userId = req.idParams.id
  
  await deleteUserProfileImageService(userId)

  return res.status(204).json();
};
