import { Failure } from "@errors/Failure";
import { inject, injectable } from "inversify";
import OrganizationRepository from "@repositories/organization/OrganizationRepository";
import TYPES from "@types";
import IDeleteInstituitionUseCase from "./IDeleteInstituitionUseCase";

@injectable()
class DeleteInstituitionUseCase implements IDeleteInstituitionUseCase {
    constructor(
        @inject(TYPES.organizationRepository)
        private organizationRepository: OrganizationRepository
    ) { }
    public async execute(id: number) {
        const organization = await this.organizationRepository.findById(id);
        const organizationDB = organization.right();

        if (!organizationDB) {
            throw Failure.organizationNotExist;
        }

        if (!organizationDB.active) {
            throw Failure.organizationDeleteError;
        }
        delete organizationDB.languages;
        organizationDB.active = false;

        await this.organizationRepository.update(organizationDB, id);
    }
}

export default DeleteInstituitionUseCase