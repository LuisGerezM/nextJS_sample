import { UserDTO } from "../dto/user.dto";
import { UserModel } from "../../domain/models/user.model";

export class UserMapper {
  // Mapea contrato externo (DTO) a nuestro contrato interno (Model)
  static fromDTOToModel(dto: UserDTO): UserModel {
    return {
      id: dto.id.toString(),
      fullName: dto.name,
      contactEmail: dto.email,
      phoneNumber: dto.phone,
      websiteUrl: dto.website,
      companyName: dto.company.name,
      companyPhrase: dto.company.catchPhrase,
    };
  }
}
