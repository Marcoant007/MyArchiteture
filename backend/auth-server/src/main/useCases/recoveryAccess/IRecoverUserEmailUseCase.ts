import { User } from "@models/User";
import RecoverUserEmailDTO from "src/main/dto/RecoverUserEmailDTO";

export default interface IRecoverUserEmailUseCase {
    execute(recoverUserEmail: RecoverUserEmailDTO): Promise<User>;
}