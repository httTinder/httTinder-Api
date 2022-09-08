import { Request, Response } from "express";
import imageDeleteService from "../../../../services/user/user_profile/user_images/deleteImage.service";

export const imageDeleteController = async (req: Request, res: Response) => {
  const id = req.idParams.id
  
  const isAdm = req.user.isAdm

  const imagesToDelete = req.body

  await imageDeleteService(id, isAdm, imagesToDelete)

  return res.status(204).json({ message: "Image(s) deleted with sucess!" });
};
