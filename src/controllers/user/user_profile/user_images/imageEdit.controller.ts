import { Request, Response } from "express";
import { IUserEditRequest } from "../../../../interfaces/user";
import imageEditService from "../../../../services/user/user_profile/user_images/imageEdit.service";
import userEditService from "../../../../services/user/userEdit.service";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { cloudinaryResponse } from "../../../../interfaces/user/user_profile/user_images";

export const imageEditController = async (req: Request, res: Response) => {
  const id = req.idParams.id

  const cloudinaryRespo = []
  
  const files : [] | any = req.files

  for (const file of files) {
    const upload = await cloudinary.uploader.upload(
      file!.path,
      (error: any, result: any) => result
    );
    fs.unlink(file!.path, (error) => {
      if (error) {
        console.log(error);
      }
    });
    cloudinaryRespo.push(upload)
  }


  await imageEditService(id, cloudinaryRespo);

  return res.status(200).json({ message: "user changed successfully" });
};
