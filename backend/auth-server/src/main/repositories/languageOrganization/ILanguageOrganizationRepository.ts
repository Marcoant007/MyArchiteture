import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { OrganizationHasLanguage } from "@models/OrganizationHasLanguage";

export default interface ILanguageOrganizationRepository {
    registerNewLanguageOrganization(relation: OrganizationHasLanguage): Promise<Either<Failure, OrganizationHasLanguage>>
    deleteLanguageOrganization(id: number): Promise<Either<Failure, any>>
}