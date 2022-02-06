import { Pagination } from "@database/Pagination";
import ICourseRepository from "@repositories/course/ICourseRepository";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import CourseDTO from "src/main/dto/CourseDTO";
import IFindAllCourseUseCase from "./IFindAllCourseUseCase";

@injectable()
class FindAllCourseUseCase implements IFindAllCourseUseCase {

    constructor(
        @inject(TYPES.courseRepository)
        private readonly courseRepository: ICourseRepository
    ) {

    }
    public async execute(page: any, limit: any, name: any): Promise<{ courses: CourseDTO[]; count: number; }> {
        const pagination = new Pagination(limit, page);
        this.courseRepository.setPagination(pagination);
        const courseRepository = await this.courseRepository.find(name);
        const { courseDB, count } = courseRepository.right();
        const courses = courseDB.map(course => new CourseDTO(course))
        const response = { courses, count }
        return response;
    }


}

export default FindAllCourseUseCase;