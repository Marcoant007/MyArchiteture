import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("assessement")
export class Assessement {

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "content_id"})
    contentId: number;

    @Column({name: "title"})
    title: string;

    @Column({name: "score"})
    score: number;

    @Column({name: "average"})
    average: number;

    @Column({name: "number_of_retries"})
    numberOfRetries: number;

    @Column({name: "initial_date"})
    initialDate: Date;

    @Column({name: "end_date"})
    endDate: Date;

    @Column({name: "duration"})
    duration: Date;

    @Column({name: "sort_questions"})
    sortQuestions: boolean;

    @Column({name: "sort_options"})
    sortOptions: boolean;

    @Column({name: "feedback_type"})
    feedbackType: number; // ENUM;

}