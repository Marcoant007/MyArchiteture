import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Course } from "@models/Course";
import { injectable } from "inversify";
import { off } from "process";
import { getRepository, Repository } from "typeorm";
import ICourseRepository from "./ICourseRepository";

@injectable()
class CourseRepository implements ICourseRepository {

    private ormRepository: Repository<Course>;
    private pagination: Pagination;

    constructor() {
        this.ormRepository = getRepository(Course);
    }


    async save(course: Course): Promise<Either<Failure, Course>> {
        try {
            const courseDB = await this.ormRepository.save(course);
            return Either.right(courseDB);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findById(id: number): Promise<Either<Failure, Course>> {
        try {
            const courseDB = await this.ormRepository.createQueryBuilder("course")
                .where("course.id =:id", { id })
                .andWhere("course.deleted = false")
                .getOneOrFail();

            return Either.right(courseDB);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findByNameCourse(name: string): Promise<Either<Failure, Course>> {
        try {
            const courseDB = await this.ormRepository.findOne({ where: { name: name } });
            return Either.right(courseDB);
        } catch (error) {
            return Either.left(error.message);
        }
    }
    async update(course: Course): Promise<Either<Failure, Boolean>> {
        try {
            await this.ormRepository.update(course.id, course);
            return Either.right(true);
        } catch (error) {
            return Either.left(error.message);
        }
    }
    async find(name: string): Promise<Either<Failure, { courseDB: Course[]; count: number; }>> {
        try {

            const offset = this.pagination.offset();
            const limit = this.pagination.limit();

            let query = this.ormRepository.createQueryBuilder("course")
                .where("course.deleted = false")
                .limit(limit)
                .offset(offset)
                .orderBy(`course.name`, "ASC")

            if (name) {
                query.andWhere("course.name ilike :name", { name: `%${name}` });
            }

            const [courseDB, count] = await query.getManyAndCount();
            return Either.right({ courseDB, count });
        } catch (error) {
            return Either.left(error.message);
        }

    }
    setPagination(pagination: Pagination): void {
        this.pagination = pagination;
    }

}

export default CourseRepository;