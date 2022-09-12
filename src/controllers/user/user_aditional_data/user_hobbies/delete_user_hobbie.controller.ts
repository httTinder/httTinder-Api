import { Request, Response } from "express";
import deleteUserHobbieService from "../../../../services/user/user_aditional_data/user_hobbies/deleteUserHobbies.service";

const deleteUserHobbieController = async (req: Request, res: Response) => {
  const userId = req.idParams.id;
  const authUserId = req.user.id;
  const idToDelete = req.body.uuid;

  await deleteUserHobbieService(userId, idToDelete, authUserId);

  return res.json({ message: "Hobbie deleted with sucess" });
};

export default deleteUserHobbieController;
