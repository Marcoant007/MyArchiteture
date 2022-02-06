import { User } from "@models/User";
import UserDTO from "src/main/dto/UserDTO";

export default interface IFindUserByIdUseCase {
    execute(id: number): Promise<User>
}
