import CourseDTO from "src/main/dto/CourseDTO";

export default interface IUpdateCourseUseCase {
    execute(courseDTO: CourseDTO, id: number);
}