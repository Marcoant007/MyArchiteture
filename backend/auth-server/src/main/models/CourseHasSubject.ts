import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./Course";

@Entity("course_has_subject")
export class CurseHasSubject {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({ name: "course_id" })
    courseId: number;

    @Column({ name: "subject_id" })
    subjectId: number;

    @ManyToOne(() => Course, (course) => course.curseHasSubject , { eager: true })
    @JoinColumn({ name: "course_id" })
    course: Course;
}