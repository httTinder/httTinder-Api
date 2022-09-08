import { Request, Response } from "express";
import userDeleteProfileService from "../../../services/user/user_profile/delete_user_profile.service";

const userDeleteProfileController = async (req: Request, res: Response) => {
  const id = req.idParams.id;

  await userDeleteProfileService(id);

  return res.status(204).json({ message: "Address deleted with sucess!" });
};

export default userDeleteProfileController;
