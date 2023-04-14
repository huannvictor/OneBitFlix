import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { episodeService } from "../services/episodeService";

export const episodesController = {
  // GET /episodes/stream?videoUrl=
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;
    const range = req.headers.range; // retorno é uma string -> bytes=0-1024...

    try {
      if (typeof videoUrl !== "string") {
        throw new Error("videoUrl deve ser do tipo 'string'");
      }

      episodeService.streamEpisodeToResponse(res, videoUrl, range);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
