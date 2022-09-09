import { Request, Response } from "express";
import { deletePetsService } from "../../../../services/user/user_aditional_data/user_pets/deletePets.service";

export const deleteUserPetsController = async (req: Request, res: Response) => {
  const id = req.idParams.id;

  await deletePetsService(id);

  return res.json({ message: "Pet Deleted" });
};