import { AuthUserDTO } from "../dto/auth-user.dto";

export abstract class AuthDatasource {
  abstract findUserByEmail(email: string): Promise<AuthUserDTO>;
}
