import TYPES from "@types";
import { inject, injectable } from "inversify";
import { Failure } from "@errors/Failure";
import IFindInstituitionByIdUseCase from "./IFindInstituitionByIdUseCase";
import { Organization } from "@models/Organization";
import IOrganizationRepository from "@repositories/organization/IOrganizationRepository";

@injectable()
class FindInstituitionByIdUseCase implements IFindInstituitionByIdUseCase {
    constructor(
        @inject(TYPES.organizationRepository)
        private readonly organizationRepository: IOrganizationRepository
    ) { }
    async execute(id: number): Promise<Organization> {
        const institution = await this.organizationRepository.findById(id);
        const institutionDb = institution.right();

        if (!institutionDb) {
            throw Failure.organizationNotExist;
        }

        return institutionDb;
    }
}

export default FindInstituitionByIdUseCase