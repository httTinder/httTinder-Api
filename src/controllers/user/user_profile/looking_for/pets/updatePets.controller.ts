import { Request, Response } from "express";
import { updatePetsService } from "../../../../../services/user/user_profile/looking_for/pets/updatePets.service";

export const updatePetsController = async (req: Request, res: Response) => {
  const id = req.idParams.id;

  const petData = req.body;

  await updatePetsService(petData, id);

  return res.json({ message: "pets changes with sucess" });
};
