import { UserDTO } from "../dto/user.dto";

export abstract class UserDatasource {
  abstract fetchUserDetails(): Promise<UserDTO>;
}
