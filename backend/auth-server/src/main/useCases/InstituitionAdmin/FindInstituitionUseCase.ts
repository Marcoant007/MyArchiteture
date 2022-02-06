import { Pagination } from "@database/Pagination";
import OrganizationRepository from "@repositories/organization/OrganizationRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import InstituitionAdminDTO from "src/main/dto/InstituitionDTO";
import IFindInstituitionUseCase from "./IFindInstituitionUseCase";

@injectable()
class FindInstituitionUseCase implements IFindInstituitionUseCase {
    constructor(
        @inject(TYPES.organizationRepository)
        private readonly organizationRepository: OrganizationRepository
    ) { }
    public async execute(page: number, limit: number): Promise<{ instituitions: InstituitionAdminDTO[]; count: number; }> {
        const pagination = new Pagination(limit, page);
        this.organizationRepository.setPagination(pagination);
        const instituition = await this.organizationRepository.find();
        const { instituitionDb, count } = instituition.right();
        const instituitions = instituitionDb.map(instituition => new InstituitionAdminDTO(instituition));
        const response = { instituitions, count };
        return response;
    }
}

export default FindInstituitionUseCase;