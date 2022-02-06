import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("Options")
export class Options {

    @PrimaryGeneratedColumn()
    id:number
    
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "multiple_choice_id"})
    multipleChoiceId: number;

    @Column({name: "title"})
    title: string;

    @Column({name: "feedback"})
    feedback: string;

    @Column({name: "isCorrect"})
    isCorrect: boolean;
}