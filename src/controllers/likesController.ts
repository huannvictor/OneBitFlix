import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likesController = {
  //GET /likes
  index: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      const likedCourses = await likeService.findUserById(userId);

      return res.json(likedCourses);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //POST /likes
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const like = await likeService.create(userId, Number(courseId));

      return res.status(201).json(like);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
