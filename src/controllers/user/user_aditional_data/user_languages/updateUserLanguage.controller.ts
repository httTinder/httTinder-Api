import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { updateUserLanguageService } from "../../../../services/user/user_aditional_data/user_languages/updateUserLanguages.service";

const updateUserLanguageController = async (
  req: Request,
  res: Response
) => {
  const userId = req.idParams.id;
  const languageData = req.body;

  const message = await updateUserLanguageService(languageData, userId);

  return res.status(201).json(instanceToPlain({message}))
};

export default updateUserLanguageController