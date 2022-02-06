import { Course } from "@models/Course";
import { CourseTypeEnum } from "@models/CourseTypeEnum";
import { PeriodCourseEnum } from "@models/PeriodCourseEnum";
import { StatusEnum } from "@models/UserStatusEnum";

export default class CourseDTO {
    id: number;
    name: string;
    description: string;
    courseType: CourseTypeEnum;
    periodCourse: PeriodCourseEnum;
    active?: boolean;
    deleted?: boolean;
    status?: StatusEnum;

    constructor(course: Course) {
        this.id = course.id
        this.name = course.name;
        this.description = course.description;
        this.courseType = course.courseType;
        this.periodCourse = course.periodCourse;
        
        
    }
}