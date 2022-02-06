import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("subject")
export class Subject {

    @PrimaryGeneratedColumn()
    id:number;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column()
    name: string;

    @Column({name: "subject_code"})
    subjectCode: number;

    @Column({name: "img_url"})
    imgUrl: string;

}