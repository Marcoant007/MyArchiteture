import { User } from "@models/User";
import UserDTO from "src/main/dto/UserDTO";
export default interface IFindUserUseCase {
    execute(page, limit, name, userType):Promise< {users:UserDTO[], count:number} >
}