import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Organization } from "@models/Organization";

export default interface IOrganizationRepository {
    findByName(name: string): Promise<Either<Failure, Organization | undefined>>;
    setPagination(pagination: Pagination): void;
    find(): Promise<Either<Failure, { instituitionDb: Organization[], count: number } | undefined>>;
    saveOrganization(organization: Organization): Promise<Organization | undefined>;
    findById(id: number): Promise<Either<Failure, Organization>>;
    update(organization: Organization, id: number): Promise<Either<Failure, Boolean>>
}