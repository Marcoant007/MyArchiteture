import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Organization } from "@models/Organization";
import { User } from "@models/User";
import { injectable } from "inversify";
import { Brackets, getRepository, Repository } from "typeorm";
import IOrganizationRepository from "./IOrganizationRepository";

@injectable()
export default class OrganizationRepository implements IOrganizationRepository {

    private ormRepository: Repository<Organization>;
    private pagination: Pagination;

    constructor() {
        this.ormRepository = getRepository(Organization);
    }

    setPagination(pagination: Pagination) {
        this.pagination = pagination;
    }

    async findByName(name: string): Promise<Either<Failure, Organization | undefined>> {
        try {
            const organization = await this.ormRepository.createQueryBuilder("organization")
                .where("organization.name = :name", { name: name })
                .getOne();

            return Either.right(organization);
        } catch (error) {
            return Either.left(error)
        }
    }


    async find(): Promise<Either<Failure, { instituitionDb: Organization[], count: number } | undefined>> {
        try {
            const offset = this.pagination.offset();
            const limit = this.pagination.limit();

            let query = this.ormRepository.createQueryBuilder("organization")
                .limit(limit)
                .offset(offset)
                .orderBy(`organization.name`, "ASC")
            const [instituitionDb, count] = await query.getManyAndCount();

            return Either.right({ instituitionDb, count })
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findById(id: number): Promise<Either<Failure, Organization>> {
        try {
            const organizationDB = await this.ormRepository.createQueryBuilder("organization")
                .leftJoinAndSelect('organization.languages', 'listLanguages')
                .leftJoinAndSelect('listLanguages.language', 'languages')
                .where("organization.id = :id", { id: id })
                .getOne();

            return Either.right(organizationDB)
        } catch (error) {
            return Either.left(error.message)
        }
    }

    async saveOrganization(organization: Organization): Promise<Organization | undefined> {
        const organizationDB = await this.ormRepository.save(organization);
        return organizationDB;
    }

    async update(organization: Organization, id: number): Promise<Either<Failure, Boolean>> {
        try {
            await this.ormRepository.update(id, organization);
            return Either.right(true);
        } catch (error) {
            return Either.left(error.message)
        }
    }
}