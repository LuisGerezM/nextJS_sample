import { UserDTO } from "../dto/user.dto";
import { UserDatasource } from "./user.datasource";

export class UserDatasourceImpl implements UserDatasource {
  async fetchUserDetails(): Promise<UserDTO> {
    const res = await fetch("/api/user/details");
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al obtener perfil en el datasource");
    }

    return data.user as UserDTO;
  }
}
