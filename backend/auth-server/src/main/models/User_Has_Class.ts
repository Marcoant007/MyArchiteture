import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_has_class")
export class User_Has_Class {

    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "student_id"})
    studentId: number;

    @Column({name: "class_id"})
    classId: number;

}