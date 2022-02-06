import { Organization } from "@models/Organization";

export default interface IFindInstituitionByIdUseCase {
    execute(id: number): Promise<Organization>
}