import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Organization } from "@models/Organization";
import InstituitionAdminDTO from "src/main/dto/InstituitionDTO";

export default interface IUpdateInstitutionUseCase {
    execute(institution: InstituitionAdminDTO, id: number): Promise<Organization>
}