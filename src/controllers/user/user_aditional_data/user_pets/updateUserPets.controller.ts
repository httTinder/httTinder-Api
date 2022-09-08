import { Request, Response } from "express";
import { updatePetsService } from "../../../../services/user/user_aditional_data/user_pets/updatePets.service";

export const updateUserPetsController = async (req: Request, res: Response) => {
  const id = req.idParams.id;
  const data = req.body;
  await updatePetsService(data, id);

  return res.json({ message: "Deu certo" });
};
