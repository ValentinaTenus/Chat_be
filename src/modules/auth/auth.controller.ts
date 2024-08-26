import { Request, Response } from "express";

import { AuthenticatedRequest } from "~/middleware/auth-middleware.js";

import { AuthService } from "./auth.service.js";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const { user, tokens } = await this.authService.register(userData);
      res.status(201).json({ user, tokens });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { user, tokens } = await this.authService.login(email, password);
      res.status(200).json({ user, tokens });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  public getTokens = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;
      const { tokens } = await this.authService.getTokens(userId);
      res.status(200).json({ tokens });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
