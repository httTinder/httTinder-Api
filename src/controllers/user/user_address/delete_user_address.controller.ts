import { Request, Response } from "express";
import userDeleteAddressService from "../../../services/user/user_address/delete_user_address.service";

const userDeleteAddressController = async (req: Request, res: Response) => {
  const id = req.idParams.id
  
  await userDeleteAddressService(id);

  return res.status(204).json({ message: "Address deleted with sucess!" });
};

export default userDeleteAddressController;

