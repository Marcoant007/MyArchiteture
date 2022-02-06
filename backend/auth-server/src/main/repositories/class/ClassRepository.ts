import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Class } from "@models/Class";
import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import IClassRepository from "./IClassRepository";

@injectable()
export default class ClassRepository implements IClassRepository {
    private ormRepository: Repository<Class>;
    private pagination: Pagination;

    constructor() {
        this.ormRepository = getRepository(Class);
    }

    setPagination(pagination: Pagination): void {
        this.pagination = pagination;
    }

    async findClassByCode(code: string): Promise<Either<Failure, Class>> {
        try {
            const classDb = await this.ormRepository.findOne({
                where: { codeClass: code }
            })
            return Either.right(classDb);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async save(classStudents: Class): Promise<Either<Failure, Class>> {
        try {
            const classDb = await this.ormRepository.save(classStudents);
            return Either.right(classDb);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async find(): Promise<Either<Failure, { classDB: Class[], count: number } | undefined>> {
        try {
            const offset = this.pagination.offset();
            const limit = this.pagination.limit();

            let query = this.ormRepository.createQueryBuilder("class")
                .where("class.deleted = false")
                .limit(limit)
                .offset(offset)
                .orderBy(`class.name`, "ASC")
            const [classDB, count] = await query.getManyAndCount();
            return Either.right({ classDB, count })
        } catch (error) {
            return Either.left(error.message)
        }
    }

    async findById(id: number): Promise<Either<Failure, Class>> {
        try {
            const classDb = await this.ormRepository.createQueryBuilder('class')
                .where("class.id = :id", { id })
                .getOneOrFail()

            return Either.right(classDb)
        } catch (error) {
            return Either.left(error.message)
        }
    }

    async update(classStudents: Class, id: number): Promise<Either<Failure, Boolean>> {
        try {
            await this.ormRepository.update(id, classStudents);
            return Either.right(true);
        } catch (error) {
            return Either.left(error.message);
        }
    }
}