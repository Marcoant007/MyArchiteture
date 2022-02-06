import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { OrganizationHasLanguage } from "@models/OrganizationHasLanguage";
import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import ILanguageOrganizationRepository from "./ILanguageOrganizationRepository";

@injectable()
export default class LanguageOrganizationRepository implements ILanguageOrganizationRepository {
    private ormRepository: Repository<OrganizationHasLanguage>;

    constructor() {
        this.ormRepository = getRepository(OrganizationHasLanguage)
    }
    async registerNewLanguageOrganization(relation: OrganizationHasLanguage): Promise<Either<Failure, OrganizationHasLanguage>> {
        try {
            const query = await this.ormRepository.save(relation);
            return Either.right(query)
        } catch (error) {
            return Either.left(Failure.RelationLanguageOrganizationSaveError);
        }
    }
    async deleteLanguageOrganization(id: number): Promise<Either<Failure, any>> {
        try {
            const query = await this.ormRepository.delete(id)
            return Either.right(query)
        } catch (error) {
            return Either.left(Failure.RelationLanguageOrganizationDeleteError)
        }
    }
}