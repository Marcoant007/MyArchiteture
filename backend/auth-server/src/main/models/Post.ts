import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("post")
export class Post {

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({name: "root_post_id"})
    rootPostId: number;

    @Column({name: "topic_id"})
    topicId: number;

    @Column()
    date: Date;

    @Column()
    content: string;

    @Column({name: "name_of_responsible"})
    nameOfResponsible: string;

    @Column()
    likes: number;
}