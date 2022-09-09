import { Request, Response } from "express";
import deleteUserHobbieService from "../../../../services/user/user_aditional_data/user_hobbies/deleteUserHobbies.service";

const deleteUserHobbieController = async (req: Request, res: Response) => {
  const id = req.idParams.id;
  const { uuid } = req.body;

  await deleteUserHobbieService(id, uuid);

  return res.json({ message: "Hobbie Deleted With Sucess" });
};

export default deleteUserHobbieController;
