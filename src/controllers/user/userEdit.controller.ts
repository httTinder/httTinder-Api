import { Request, Response } from "express";
import { IUserEditRequest } from "../../interfaces/user";
import userEditService from "../../services/user/userEdit.service";

export const userEditController = async (req: Request, res: Response) => {
  const id = req.idParams.id

  const data: IUserEditRequest = req.body;

  await userEditService(id, data);

  return res.status(200).json({ message: "user changed successfully" });
};
