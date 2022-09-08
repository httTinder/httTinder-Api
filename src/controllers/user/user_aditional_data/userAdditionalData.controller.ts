import { userAdditionalDataService } from "./../../../services/user/user_aditional_data/userAdditionalData.service";
import { Request, Response } from "express";
import { IUserAddDataRequest } from "../../../interfaces/user/user_additionalData";

export const userAdditionalDataController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.idParams.id;
  const data: IUserAddDataRequest = req.body;

  await userAdditionalDataService(data, id);

  return res.json({ message: "Additional Data updated" });
};
