import { Request, Response } from "express";

import { OAuthService } from "./oauth.service.js";
import { GoogleAuthRequestDto } from "./types/index.js";

class OAuthController {
  private oauthService: OAuthService;

  constructor() {
    this.oauthService = new OAuthService();
  }

  public googleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body as GoogleAuthRequestDto;
      const { user, tokens } = await this.oauthService.googleLogin(data);
      res.status(201).json({ user, tokens });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export { OAuthController };