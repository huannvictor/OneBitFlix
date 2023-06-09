import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {
  // GET /users/current
  show: async (req: AuthenticatedRequest, res: Response) => {
    const current = req.user!;

    try {
      return res.json(current);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },

  // PUT /users/current
  update: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { firstName, lastName, phone, email, birth } = req.body;

    try {
      const updatedUser = await userService.update(userId, {
        firstName,
        lastName,
        phone,
        email,
        birth,
      });

      return res.json(updatedUser);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },

  // PUT /users/current/password
  updatePassword: async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    user?.checkPassword(currentPassword, async (err, isSame) => {
      try {
        if (err) return res.status(400).json({ message: err.message });

        if (!isSame)
          return res.status(400).json({ message: "Senha incorreta" });

        await userService.updatePassword(user.id, newPassword);

        return res.status(204).send("senha alterada com sucesso.");
      } catch (error) {
        if (error instanceof Error)
          return res.status(400).json({ message: error.message });
      }
    });
  },

  // GET /users/current/watching
  watching: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      const watching = await userService.getKeepWatchingList(userId);
      return res.json(watching);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
