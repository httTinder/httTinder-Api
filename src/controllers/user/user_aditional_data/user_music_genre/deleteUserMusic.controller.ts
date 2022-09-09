import { Request, Response } from "express";
import { deleteUserMusicService } from "../../../../services/user/user_aditional_data/user_music_genre/deleteUserMusicservice";

export const deleteUserMusicController = async (
  req: Request,
  res: Response
) => {
  const id = req.idParams.id;
  const { uuid } = req.body;

  await deleteUserMusicService(id, uuid);

  return res.json({ message: "Genre deleted" });
};
