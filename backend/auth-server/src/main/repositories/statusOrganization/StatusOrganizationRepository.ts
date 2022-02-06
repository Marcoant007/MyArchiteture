
import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";

import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { StatusOrganization } from "@models/StatusOrganization";
import IStatusOrganization from "./IStatusOrganizationRepository";

@injectable()
export default class StatusOrganizationRepository implements IStatusOrganization {
    private ormRepository: Repository<StatusOrganization>

    constructor() {
        this.ormRepository = getRepository(StatusOrganization);
    }

    public async findStatus(status: string):
        Promise<Either<Failure, StatusOrganization>> {
        try {
            const statusOrganization = await this.ormRepository.findOne({
                where: { status }
            });
            return Either.right(statusOrganization);
        } catch (error) {
            return  Either.left(Failure.organizationSaveError);
        }
    }

}