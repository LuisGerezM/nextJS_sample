import { UserModel } from "../models/user.model";

export abstract class UserRepository {
  abstract getUserDetails(): Promise<UserModel>;
}
