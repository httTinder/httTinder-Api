import { Request, Response } from "express";
import { updateUserMusicService } from "../../../../services/user/user_aditional_data/user_music_genre/updateUserMusic.service";

export const updateUserMusicController = async (
  req: Request,
  res: Response
) => {
  const userId = req.idParams.id;
  const musicData = req.body;

  const message = await updateUserMusicService(musicData, userId);

  return res.json({ message });
};
