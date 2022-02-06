import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("class")
export class Class {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({ name: "code_class" })
    codeClass: string;

    @Column({ name: "course_id" })
    courseId: number;

    @Column({ name: "start_date" })
    startDate: Date;

    @Column()
    deleted: boolean = false;

    @Column({ name: "grid" })
    grid: number;

    @Column({ name: "name" })
    name: string;

}