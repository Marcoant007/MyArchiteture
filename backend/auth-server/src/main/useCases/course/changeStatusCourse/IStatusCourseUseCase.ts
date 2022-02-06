import { Course } from "@models/Course";

export default interface IStatusCourseUseCase {
    execute(id: number, status: string):Promise<Course>
}