import { IUser, User } from "~/models/user.model.js";

export class UserRepository {
  public async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  public async createUser(userData: IUser): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }

  public async findById(userId: string): Promise<IUser | null> {
    return User.findById(userId).exec();
  }
}
