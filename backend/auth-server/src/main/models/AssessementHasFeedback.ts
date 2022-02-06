import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("assessement_has_feedback")
export class AssessementHasFeedback {
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "assessement_id"})
    assessementId:number;

    @Column({name: "feedback_id"})
    feedbackId: number;
}