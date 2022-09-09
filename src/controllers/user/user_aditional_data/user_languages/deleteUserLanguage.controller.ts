import { Request, Response } from "express";
import { deleteUserLanguageService } from "../../../../services/user/user_aditional_data/user_languages/deleteUserLanguage.service";

export const deleteUserLanguageController = async (
  req: Request,
  res: Response
) => {
  const id = req.idParams.id;
  const { uuid } = req.body;

  await deleteUserLanguageService(id, uuid);

  return res.json({ message: "Language deleted with sucess" });
};
