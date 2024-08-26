import { IUser } from "~/models/user.model"

interface IAuthResponse {
  user: IUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export { type IAuthResponse };