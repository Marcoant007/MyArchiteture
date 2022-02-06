import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("class_has_subject")
export class ClassHasSubject{

    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "class_id"})
    classId: number;

    @Column({name: "subject_id"})
    subjectId: number;
    
}