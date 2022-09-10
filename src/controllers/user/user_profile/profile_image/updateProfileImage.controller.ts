import { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { updateUserProfileImageService } from "../../../../services/user/user_profile/profileImage/updateUserProfile.service";

export const updateUserProfileImageController = async (
  req: Request,
  res: Response
) => {
  const userId = req.idParams.id;

  const cloudinaryRespo: any = [];

  const files: any = req.files;

  for (const file of files) {
    const upload = await cloudinary.uploader.upload(
      file!.path,
      {
        folder: "htttinder"
      },
      
      (error: any, result: any) => result
    );
    fs.unlink(file!.path, (error) => {
      if (error) {
        console.log(error);
      }
    });
    cloudinaryRespo.push(upload);
  }

  const message = await updateUserProfileImageService(userId, cloudinaryRespo);
  
  return res.status(201).json({ message : "profile image update successfully" });
};
