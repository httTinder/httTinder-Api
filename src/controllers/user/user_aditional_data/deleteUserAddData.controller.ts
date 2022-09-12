import { Request, Response } from "express";
import { deleteUserAddDataService } from "../../../services/user/user_aditional_data/deleteUserAddData.service";

export const deleteUserAddDataController = async (
  req: Request,
  res: Response
) => {
  const id = req.idParams.id;

  await deleteUserAddDataService(id);

  return res.json({ message: "Additional Data deleted with sucess" });
};
