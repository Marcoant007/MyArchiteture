import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("multiple_choices")
export class MultipleChoices {

    @PrimaryGeneratedColumn()
    id:number;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column()
    title: string;

    @Column()
    feedback: string;
}