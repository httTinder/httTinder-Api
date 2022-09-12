import { Request, Response } from "express";
import { deletePetsService } from "../../../../services/user/user_aditional_data/user_pets/deletePets.service";

export const deleteUserPetsController = async (req: Request, res: Response) => {
  const userId = req.idParams.id;
  const authUserId = req.user.id
  const idToDelete  = req.body.uuid;

  await deletePetsService(userId, idToDelete, authUserId);

  return res.json({ message: "Pet field deleted" });
};
