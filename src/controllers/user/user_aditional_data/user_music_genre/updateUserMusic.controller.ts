import { Request, Response } from "express";
import { updateUserMusicService } from "../../../../services/user/user_aditional_data/user_music_genre/updateUserMusic.service";

export const updateUserMusicController = async (
  req: Request,
  res: Response
) => {
  const id = req.idParams.id;
  const data = req.body;

  await updateUserMusicService(data, id);

  return res.json({ message: "Genre updated" });
};
