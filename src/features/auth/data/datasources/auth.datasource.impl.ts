import { envs } from "@/config/envs/envs";
import { AuthUserDTO } from "../dto/auth-user.dto";
import { AuthDatasource } from "./auth.datasource";

export class AuthDatasourceImpl implements AuthDatasource {
  async findUserByEmail(email: string): Promise<AuthUserDTO> {
    const response = await fetch(`${envs.apiBaseUrl}/users?email=${email}`);
    const users = await response.json();

    if (!users || users.length === 0) {
      throw new Error("Usuario no encontrado. Prueba con: Sincere@april.biz");
    }

    return users[0] as AuthUserDTO;
  }
}
