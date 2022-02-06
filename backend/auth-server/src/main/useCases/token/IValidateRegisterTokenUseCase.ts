import { User } from "@models/User";
import LoginDTO from "src/main/dto/LoginDTO";
import RecoverUserEmailDTO from "src/main/dto/RecoverUserEmailDTO";
import ResetPasswordUserDTO from "src/main/dto/ResetPasswordUserDTO";

export default interface IValidateRegisterTokenUseCase {
    execute({token}:ResetPasswordUserDTO);
}