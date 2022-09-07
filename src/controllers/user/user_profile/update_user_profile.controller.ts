import { Request, Response } from "express";
import updateUserProfileService from "../../../services/user/user_profile/update_user_profile.service";

export const updateUserProfileController = async (
  req: Request,
  res: Response
) => {
  await updateUserProfileService();
};
