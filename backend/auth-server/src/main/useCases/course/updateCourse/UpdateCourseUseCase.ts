import { Failure } from "@errors/Failure";
import { Course } from "@models/Course";
import { StatusEnum } from "@models/UserStatusEnum";
import ICourseRepository from "@repositories/course/ICourseRepository";
import TYPES from "@types";
import { Types } from "aws-sdk/clients/s3";
import { inject, injectable } from "inversify";
import CourseDTO from "src/main/dto/CourseDTO";
import IUpdateCourseUseCase from "./IUpdateCourseUseCase";

@injectable()
class UpdateCourseUseCase implements IUpdateCourseUseCase {
    constructor(
        @inject(TYPES.courseRepository)
        private readonly courseRepository: ICourseRepository
    ) {

    }
    async execute(courseDTO: CourseDTO, id: number) {
       try {
        const courseDB = await this.findCourseById(id);
        const courseByName = await this.findNameCourse(courseDTO.name);

        this.updateCourseFields(courseDB, courseDTO);

        if(courseByName){
            if(courseByName.id != courseDB.id){
                throw Failure.courseAlreadyExists
            }
        }
        
        await this.courseRepository.update(courseDB);

        return courseDB
       } catch (error) {
           return error.message
       }
    }

    public async updateCourseFields(courseDB: Course, courseDTO: CourseDTO){
        courseDB.name = courseDTO.name;
        courseDB.description = courseDTO.description;
        courseDB.courseType = courseDTO.courseType;
        courseDB.periodCourse = courseDTO.periodCourse;
        courseDB.updatedAt = new Date();

        if (courseDTO.status === StatusEnum.Habilitado) {
            courseDB.active = true;
        } else if (courseDTO.status === StatusEnum.Desabilitado) {
            courseDB.active = false;
        }
    }

    public async findCourseById(id:number): Promise<Course>{
        const courseRepository = await this.courseRepository.findById(id);

        if(!courseRepository.right()){
            throw Failure.courseNotExists
        }

        return courseRepository.right();
    }

    public async findNameCourse(name: string): Promise<Course>{
        const courseRepository = await this.courseRepository.findByNameCourse(name);

        if(!courseRepository.right()){
            return 
        }
        return courseRepository.right();
    }  
}

export default UpdateCourseUseCase;