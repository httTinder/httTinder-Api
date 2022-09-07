import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import userDeleteAddressService from "../../../services/user/user_address/delete_user_address.service";

const userDeleteAddressController = async (req: Request, res: Response) => {
  try {
    let id = req.user.id;

    if (req.params.id !== undefined) {
      id = req.params.id;
    }

    await userDeleteAddressService(id);

    return res.status(204).json({ message: "Address deleted with sucess!" });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
};

export default userDeleteAddressController;
