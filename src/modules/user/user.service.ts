import { UserRepository } from "./user.repository.js";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public findById(id: string){
    return this.userRepository.findById(id);
  }
}

export { UserService };