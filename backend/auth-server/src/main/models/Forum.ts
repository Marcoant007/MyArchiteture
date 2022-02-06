import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("forum")
export class Forum {

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column()
    name:string;

    @Column({name: "subject_id"})
    subjectId: number;

    @Column()
    type: string;

    @Column({name: "start_date"})
    startDate: Date;

    @Column({name: "end_date"})
    endDate:Date;

    @Column()
    limit: number;

}