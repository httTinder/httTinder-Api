import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import userListService from "../../services/user/userList.service";

const userListController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await userListService(id);
  return res.status(200).json(instanceToPlain(user));
};

export { userListController };
