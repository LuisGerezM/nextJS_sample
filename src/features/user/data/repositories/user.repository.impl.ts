import { UserModel } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserDatasource } from "../datasources/user.datasource";
import { UserMapper } from "../mappers/user.mapper";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  async getUserDetails(): Promise<UserModel> {
    const userDTO = await this.datasource.fetchUserDetails();
    return UserMapper.fromDTOToModel(userDTO);
  }
}
