import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserAdressRequest } from "../../../interfaces/user/user_address";
import updateUserAddressService from "../../../services/user/user_address/update_user_address.service";

const updateUserAddressController = async (req: Request, res: Response) => {
  const userData: IUserAdressRequest = req.body;
  
  const id = req.idParams.id
 
  await updateUserAddressService(userData, id);
  return res
    .status(201)
    .json(instanceToPlain({ message: "Address changed successfully" }));
};

export default updateUserAddressController;
