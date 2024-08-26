import crypto from "crypto";

import { IUser } from "~/models/user.model.js";

import { UserRepository } from "../user/user.repository.js";
import { IAuthResponse } from "../auth/types/auth-response.type.js";
import { verifyGoogleToken } from "./helpers/verify-google-token.js";
import { GoogleAuthRequestDto } from "./types/google-auth-request-dto.type.js";
import { AuthService } from "../auth/auth.service.js";

class OAuthService {
  private userRepository: UserRepository;
  private authService: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  public async googleLogin(data: GoogleAuthRequestDto): Promise<IAuthResponse> {
    const verificationResponse = await verifyGoogleToken(data.credential);

    if (verificationResponse.error) {
      throw new Error(verificationResponse.error,)
    }

    const profile = verificationResponse?.payload;
    const { email, given_name, family_name } = profile;

    const existingUser = await this.userRepository.findByEmail(profile.email);

    if (existingUser) {
      const userId = existingUser._id.toString();
      const { tokens } = await this.authService.getTokens(userId);

      return {
        user: existingUser,
        tokens
      };
    }

    const randomPassword = crypto.randomBytes(16).toString("hex");

    const userData = {
      firstName: given_name,
      lastName: family_name,
      email,
      password: randomPassword
    } as IUser;

    const user = await this.userRepository.createUser(userData);
    const { tokens } = await this.authService.getTokens((user._id).toString());
    
    return { user: user, tokens };
  }
}

export { OAuthService };