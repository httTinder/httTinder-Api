import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserHobbies } from "../../../../interfaces/user/user_aditional_data/user_hobbies";
import updateUserHobbiesService from "../../../../services/user/user_aditional_data/user_hobbies/updateUserHobbies.service";

const updateUserHobbiesController = async (req: Request, res: Response) => {
  const userData: IUserHobbies = req.body;

  const id = req.idParams.id;

  await updateUserHobbiesService(userData, id);
  return res
    .status(201)
    .json(instanceToPlain({ message: "Hobbies changed successfully" }));
};

export default updateUserHobbiesController;
