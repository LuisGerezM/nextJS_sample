import { AuthUserModel } from "../models/auth-user.model";

export abstract class AuthRepository {
  abstract loginByEmail(email: string): Promise<AuthUserModel>;
}
