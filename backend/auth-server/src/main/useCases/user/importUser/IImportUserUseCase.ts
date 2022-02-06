import { User } from "@models/User";
import ImportUserDTO from "src/main/dto/ImportUserDTO";
import UserDTO from "src/main/dto/ImportUserDTO";

export default interface IImportUserUseCase {
    execute(file:Express.Multer.File,)
}