import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Course } from "@models/Course";

export default interface ICourseRepository {

    save(course: Course): Promise<Either<Failure, Course>>;

    findByNameCourse(name: string): Promise<Either<Failure,Course>>;

    findById(id: number): Promise<Either<Failure, Course>>;

    update(course: Course): Promise<Either<Failure, Boolean>>;

    find(name: string): Promise<Either<Failure, { courseDB: Course[], count: number } | undefined>>;

    setPagination(pagination: Pagination): void;

}