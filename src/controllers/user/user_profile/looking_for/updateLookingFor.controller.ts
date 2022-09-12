import { updateLookingForService } from "../../../../services/user/user_profile/looking_for/updateLookingFor.service";
import { Request, Response } from "express";

export const updateLookingForController = async (
  req: Request,
  res: Response
) => {
  const id = req.idParams.id;
  const data = req.body;

  await updateLookingForService(data, id);

  return res.json({ message: "LookingFor changed successfully" });
};
