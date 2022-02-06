import { Course } from "@models/Course";
import CourseDTO from "src/main/dto/CourseDTO";

export default interface ICreateCourseUseCase {
    
    execute(courseDTO: CourseDTO): Promise<Course>
}