import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("content")
export class Content {

    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "name"})
    name: string;

    @Column({name: "initial_date"})
    initialDate: Date;

    @Column({name: "end_date"})
    endDate: Date;
    
}