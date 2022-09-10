import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import updateUserHobbiesService from "../../../../services/user/user_aditional_data/user_hobbies/updateUserHobbies.service";

const updateUserHobbiesController = async (req: Request, res: Response) => {
  const userId = req.idParams.id;
  const hobbieData = req.body;

  const message = await updateUserHobbiesService(hobbieData, userId);

  return res.status(201).json(instanceToPlain({ message }));
};

export default updateUserHobbiesController;
