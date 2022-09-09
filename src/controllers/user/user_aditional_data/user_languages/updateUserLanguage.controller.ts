import { Request, Response } from "express";
import { updateUserLanguageService } from "../../../../services/user/user_aditional_data/user_languages/updateUserLanguages.service";

export const updateUserLanguageController = async (
  req: Request,
  res: Response
) => {
  const id = req.idParams.id;
  const data = req.body;

  await updateUserLanguageService(data, id);

  return res.json({message: "Language changed successfully"})
};
