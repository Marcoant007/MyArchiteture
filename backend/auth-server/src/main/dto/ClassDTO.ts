import { Class } from "@models/Class";

export default class ClassDTO {

    id: number;
    codeClass: string;
    courseId: number;
    startDate: Date;
    grid: number;
    name: string;

    constructor(classStudent: Class) {
        this.id = classStudent.id;
        this.codeClass = classStudent.codeClass;
        this.courseId = classStudent.courseId;
        this.startDate = classStudent.startDate;
        this.grid = classStudent.grid;
        this.name = classStudent.name;
    }
}