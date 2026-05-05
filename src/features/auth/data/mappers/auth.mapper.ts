import { AuthUserDTO } from "../dto/auth-user.dto";
import { AuthUserModel } from "../../domain/models/auth-user.model";

export class AuthMapper {
  static fromDTOToModel(dto: AuthUserDTO): AuthUserModel {
    return {
      id: dto.id.toString(),
      name: dto.name,
      email: dto.email,
    };
  }
}
