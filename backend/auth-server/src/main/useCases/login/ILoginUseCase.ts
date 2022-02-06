import { User } from "@models/User";
import UserDTO from "src/main/dto/UserDTO";
import UserLoginDTO from "src/main/dto/UserLoginDTO";

interface ILoginUseCase {
  execute(user: User): Promise<UserDTO>;
}

export default ILoginUseCase;