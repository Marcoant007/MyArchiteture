import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_has_subject')
export class UserHasSubject {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({ name: "initial_date" })
    initialDate: Date;

    @Column({ name: "end_date" })
    endDate: Date;

    @Column()
    lack: number;

    @Column()
    note: number;

    @Column()
    status: string;

    @Column()
    progress: number;
}