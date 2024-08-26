import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUser } from "~/models/user.model.js";

import { UserRepository } from "../user/user.repository.js";
import { IAuthResponse } from "./types/auth-response.type.js";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async register(userData: IUser): Promise<IAuthResponse> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const user = await this.userRepository.createUser(userData);
    const userId = user._id.toString();
    const tokens = this.generateTokens(userId);
    
    return { user, tokens };
  }

  public async login(email: string, password: string): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const userId = user._id.toString();
    const tokens = this.generateTokens(userId);

    return { user, tokens };
  }

  public async getTokens(userId: string): Promise<Omit<IAuthResponse, "user">> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    const tokens = this.generateTokens(userId);

    return { tokens };
  }

  private generateTokens(userId: string) {
    const accessToken = jwt.sign(
      { userId }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: process.env.JWT_SECRET_EXPIRE }
    );
    const refreshToken = jwt.sign(
      { userId }, 
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRE }
    );

    return { accessToken, refreshToken };
  }
}
