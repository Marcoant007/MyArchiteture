import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Course } from "@models/Course";
import { StatusEnum } from "@models/UserStatusEnum";
import ICourseRepository from "@repositories/course/ICourseRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import CourseDTO from "src/main/dto/CourseDTO";
import ICreateCourseUseCase from "./ICreateCourseUseCase";

@injectable()
class CreateCourseUseCase implements ICreateCourseUseCase {

    constructor(
        @inject(TYPES.courseRepository)
        private readonly courseRepository: ICourseRepository
    ) {
    }

    async execute(courseDTO: CourseDTO): Promise<Course> {
        let course: Course = new Course();
        course.name = courseDTO.name;
        course.description = courseDTO.description;
        course.courseType = courseDTO.courseType;
        course.periodCourse = courseDTO.periodCourse;

        if (courseDTO.status === StatusEnum.Habilitado) {
            course.active = true;
            course.deleted = false;
        } else if (courseDTO.status === StatusEnum.Desabilitado) {
            course.active = false;

        }

        const courseDB: Either<Failure, Course> = await this.courseRepository.findByNameCourse(course.name);

        if (courseDB.right()) {
            throw Failure.courseAlreadyExists
        }

        const courseSaved: Either<Failure, Course> = await this.courseRepository.save(course);

        if (courseSaved.isLeft()) {
            throw courseSaved.left();
        }

        const resultCourse: Course = courseSaved.right();

        return resultCourse;
    }
}

export default CreateCourseUseCase