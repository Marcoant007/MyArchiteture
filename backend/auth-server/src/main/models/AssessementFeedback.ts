import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EnumType } from "typescript";

@Entity("assessement_feedback")
export class AssessementFeedback {

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "message_type"})
    messageType: number; //ENUM

    @Column({name: "messages"})
    messages: string;

}