import { Request, Response } from "express";
import userDeleteService from "../../services/user/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  let id = req.user.id;

  if (req.params.id !== undefined) {
    id = req.params.id;
  }

  await userDeleteService(id);

  return res.status(204).json({ message: "User deleted with sucess!" });
};

export default userDeleteController;
