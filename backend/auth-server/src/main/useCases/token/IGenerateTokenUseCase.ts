import { User } from "@models/User";
import UserDTO from "src/main/dto/UserDTO";

export default interface IGenerateTokenUseCase {
    execute(user: UserDTO): Promise<string>;
}