import CourseDTO from "src/main/dto/CourseDTO";

export default interface IFindAllCourseUseCase {
    execute(page, limit, name): Promise<{courses: CourseDTO[], count: number}>;
}