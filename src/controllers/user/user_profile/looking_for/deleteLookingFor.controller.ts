import { Request, Response } from "express";
import { deleteLookingForService } from "../../../../services/user/user_profile/looking_for/deleteLookingFor.service";

export const deleteLookingForController = async (
  req: Request,
  res: Response
) => {
  const id = req.idParams.id;

  await deleteLookingForService(id);

  return res.status(204).json({
    message: "looking for delete successfully",
  });
};
