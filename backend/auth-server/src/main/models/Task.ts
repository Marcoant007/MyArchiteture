import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("task")
export class Task {

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column()
    name: string;

    @Column({name: "subject_code"})
    subjectCode: string;

    @Column()
    description: string;

    @Column()
    score: number;

    @Column()
    average: number;

    @Column({name: "number_of_retries"})
    numberOfRetries: number;

}