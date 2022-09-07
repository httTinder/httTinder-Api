import { Request, Response } from "express";
import userDeleteService from "../../services/user/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  const id = req.idParams.id

  await userDeleteService(id);

  return res.status(204).json({ message: "User deleted with sucess!" });
};

export default userDeleteController;
