import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CurseHasSubject } from "./CourseHasSubject";
import { CourseTypeEnum } from "./CourseTypeEnum";
import { PeriodCourseEnum } from "./PeriodCourseEnum";


@Entity("course")
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({ name: "name" })
    name: string;

    @Column()
    description: string;

    @Column({
        name: "course_type",
        type: "enum",
        enum: CourseTypeEnum
    })
    courseType: CourseTypeEnum;

    @Column({
        name: "period_course",
        type: "enum",
        enum: PeriodCourseEnum
    })
    periodCourse: PeriodCourseEnum

    @Column()
    active: boolean;

    @Column()
    deleted: boolean;

    @Column({name: "img_course"})
    imgCourse: string;

    @OneToMany(() => CurseHasSubject, (curseHasSubject) => curseHasSubject.course)
    curseHasSubject: CurseHasSubject[];

}