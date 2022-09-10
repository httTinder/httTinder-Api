import { Request, Response } from "express";
import deleteUserHobbieService from "../../../../services/user/user_aditional_data/user_hobbies/deleteUserHobbies.service";

const deleteUserHobbieController = async (req: Request, res: Response) => {
  const userId = req.idParams.id;
  const idToDelete  = req.body.uuid;

  await deleteUserHobbieService(userId, idToDelete);

  return res.json({ message: "Hobbie Deleted With Sucess" });
};

export default deleteUserHobbieController;
