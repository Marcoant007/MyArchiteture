import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("assessement_has_true_false")
export class AssessementHasTrueFalse{

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "assessement_id"})
    assessementId: number;

    @Column({name: "true_false_id"})
    trueFalseId: number;
}