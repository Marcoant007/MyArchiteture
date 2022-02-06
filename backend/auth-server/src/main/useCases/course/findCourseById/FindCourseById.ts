import { Failure } from "@errors/Failure";
import { Course } from "@models/Course";
import ICourseRepository from "@repositories/course/ICourseRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IFindCourseById from "./IFindCourseById";
import IFindCouserById from "./IFindCourseById";

@injectable()
class FindCourseById implements IFindCourseById{
    constructor(
        @inject(TYPES.courseRepository)
        private readonly courseRepository: ICourseRepository
    ){

    }
    async execute(id: number): Promise<Course> {
        const courseRepository = await this.courseRepository.findById(id);
        const courseDB = courseRepository.right();

        if(!courseDB){
            throw Failure.courseNotExists
        }

        return courseDB
    }

}

export default FindCourseById