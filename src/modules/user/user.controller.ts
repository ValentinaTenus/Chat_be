import { Response } from "express";

import { type AuthenticatedRequest } from "~/middleware/auth-middleware.js";

import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;
      const user = await this.userService.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
