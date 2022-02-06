import { User } from "@models/User";
import UserDTO from "src/main/dto/UserDTO";

export default interface IConfigUserUseCase {
    execute(userDTO: UserDTO, id: number): Promise<User>;
}