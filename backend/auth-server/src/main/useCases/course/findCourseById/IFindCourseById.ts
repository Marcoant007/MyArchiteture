import { Course } from "@models/Course";

export default interface IFindCourseById{
    execute(id:number):Promise<Course>
}