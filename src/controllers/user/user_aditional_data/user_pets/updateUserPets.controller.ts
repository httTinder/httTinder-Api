import { Request, Response } from "express";
import { updatePetsService } from "../../../../services/user/user_aditional_data/user_pets/updatePets.service";

export const updateUserPetsController = async (req: Request, res: Response) => {
  const userId = req.idParams.id;
  const petData = req.body;

  const message = await updatePetsService(petData, userId);

  return res.json({ message });
};
