import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("assessement_has_multiple_choices")
export class AssessementHasMultipleChoices {

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "multiple_choices_id"})
    multipleChoicesId:number;

    @Column({name: "assessement_id"})
    assessementId: number;
}