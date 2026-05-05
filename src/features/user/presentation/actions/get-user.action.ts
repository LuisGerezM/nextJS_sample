import { errorHandling } from "@/config/errors";
import { CatchErrorResponseIF } from "@/shared/interfaces/errors-http.interface";
import { UserModel } from "../../domain/models/user.model";
import { UserDatasourceImpl } from "../../data/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../data/repositories/user.repository.impl";

interface UserResponseIF {
  ok: boolean;
  data: UserModel | null;
  message?: string | null;
}

export const getUserAction = async (): Promise<
  UserResponseIF | CatchErrorResponseIF
> => {
  try {
    // Inyección de dependencias (Manual en este caso)
    const datasource = new UserDatasourceImpl();
    const repository = new UserRepositoryImpl(datasource);

    const user = await repository.getUserDetails();

    return { ok: true, data: user };
  } catch (error) {
    const parseError: CatchErrorResponseIF = errorHandling({
      error,
      location: "getUserAction",
    });

    return {
      ...parseError,
      message: parseError?.message || "Error al obtener perfil",
    };
  }
};
