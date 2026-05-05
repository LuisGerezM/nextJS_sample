import { AuthUserModel } from "../../domain/models/auth-user.model";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthDatasource } from "../datasources/auth.datasource";
import { AuthMapper } from "../mappers/auth.mapper";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly datasource: AuthDatasource) {}

  async loginByEmail(email: string): Promise<AuthUserModel> {
    const userDTO = await this.datasource.findUserByEmail(email);
    return AuthMapper.fromDTOToModel(userDTO);
  }
}
