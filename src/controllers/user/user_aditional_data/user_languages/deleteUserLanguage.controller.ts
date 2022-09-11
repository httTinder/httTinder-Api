import { Request, Response } from "express";
import { deleteUserLanguageService } from "../../../../services/user/user_aditional_data/user_languages/deleteUserLanguage.service";

export const deleteUserLanguageController = async (
  req: Request,
  res: Response
) => {
  const userId = req.idParams.id;
  const authUserId = req.user.id
  const idToDelete  = req.body.uuid;

  await deleteUserLanguageService(userId, idToDelete, authUserId);

  return res.json({ message: "Language deleted with sucess" });
};
