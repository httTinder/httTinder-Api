import { Request, Response } from "express";

import { IUserProfileUpdateRequest } from "../../../interfaces/user/user_profile";
import updateUserProfileService from "../../../services/user/user_profile/update_user_profile.service";

export const updateUserProfileController = async (
  req: Request,
  res: Response
) => {
  const userData: IUserProfileUpdateRequest = req.body;

  const id = req.idParams.id;

  await updateUserProfileService(userData, id);
  
  return res.status(200).json({ message: "Profile changed successfully" });
};
