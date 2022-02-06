import { Organization } from "@models/Organization";
import { User } from "@models/User";
import InstituitionUserAdminDTO from "src/main/dto/InstituitionUserAdminDTO";

export default interface IRegisterInstituitionAndAdminUseCase {
    execute(instituitionUserAdminDTO:InstituitionUserAdminDTO): Promise<any>;
}