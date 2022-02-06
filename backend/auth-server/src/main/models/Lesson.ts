import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("Lesson")
export class Lesson {

    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column()
    name:string;

    @Column({name: "content_id"})
    contentId: number;

    @Column({name: "subject_code"})
    subjectCode: number;

    @Column()
    description:string;

    @Column({name: "link_video"})
    linkVideo: string;

    @Column({name: "file_lesson"})
    fileLesson: string;
}