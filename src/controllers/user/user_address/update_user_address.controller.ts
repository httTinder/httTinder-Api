import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { IUserAdressRequest } from "../../../interfaces/user/user_address";
import updateUserAddressService from "../../../services/user/user_address/update_user_address.service";

const updateUserAddressController = async (req: Request, res: Response) => {
  try {
    const userData: IUserAdressRequest = req.body;
    let { id } = req.user;

    if (req.params.id !== undefined) {
      id = req.params.id;
    }

    await updateUserAddressService(userData, id);
    return res
      .status(201)
      .json(instanceToPlain({ message: "Address changed successfully" }));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
};

export default updateUserAddressController;
