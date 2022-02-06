import { User } from "@models/User";
import UserDTO from "src/main/dto/UserDTO";
export default interface ICreateUserUseCase {
    
    execute(userDTO: UserDTO): Promise<User>
}