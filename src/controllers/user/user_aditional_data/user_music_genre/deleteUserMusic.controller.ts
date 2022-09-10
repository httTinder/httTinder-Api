import { Request, Response } from "express";
import { deleteUserMusicService } from "../../../../services/user/user_aditional_data/user_music_genre/deleteUserMusic.service";

export const deleteUserMusicController = async (
  req: Request,
  res: Response
) => {
  const userId = req.idParams.id;
  const authUserId = req.user.id
  const idToDelete  = req.body.uuid;

  await deleteUserMusicService(userId, idToDelete, authUserId);

  return res.json({ message: "Music deleted" });
};
