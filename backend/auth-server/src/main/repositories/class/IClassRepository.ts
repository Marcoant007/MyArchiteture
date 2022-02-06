import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Class } from "@models/Class";

export default interface IClassRepository {

    setPagination(pagination: Pagination): void;

    save(classStudents: Class): Promise<Either<Failure, Class>>;

    find(): Promise<Either<Failure, { classDB: Class[], count: number } | undefined>>;

    findById(id: number): Promise<Either<Failure, Class>>;

    findClassByCode(code: string): Promise<Either<Failure, Class>>;

    update(classStudents: Class, id: number): Promise<Either<Failure, Boolean>>;

}