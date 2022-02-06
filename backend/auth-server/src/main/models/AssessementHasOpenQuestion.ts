import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("assessement_has_open_question")
export class AssessementHasOpenQuestion {

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "open_question_id"})
    openQuestionId: number;

    @Column({name: "assessement_id"})
    assessementId: number;
}