import { Failure } from "@errors/Failure";
import { Course } from "@models/Course";
import { StatusEnum } from "@models/UserStatusEnum";
import ICourseRepository from "@repositories/course/ICourseRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IStatusCourseUseCase from "./IStatusCourseUseCase";

@injectable()
class StatusCourseUseCase implements IStatusCourseUseCase {

    constructor(
        @inject(TYPES.courseRepository)
        private readonly courseRepository: ICourseRepository) { }

    async execute(id: number, status: string): Promise<Course> {
        const courseRepository = await this.courseRepository.findById(id);
        const courseDB = courseRepository.right();

        if(!courseDB){
            throw Failure.courseNotExists
        }

        if(status === StatusEnum.Habilitado){
            courseDB.active = true;
        }
        
        if( status === StatusEnum.Desabilitado){
            courseDB.active = false;
        }

        await this.courseRepository.update(courseDB);
        const courseResult = await this.courseRepository.findById(id);
        return courseResult.right();
    }

}

export default StatusCourseUseCase