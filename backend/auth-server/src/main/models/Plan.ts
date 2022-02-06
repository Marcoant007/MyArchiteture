import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Charge } from "./Charge";
import { Language } from "./Language";

@Entity("plan")
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
   
    @Column()
    name: string;


    @Column()
    value: number;

    @Column()
    monthly_value: number;

    @Column()
    users: number;

    @Column()
    validity: Date;

    @Column()
    description: string;

    @Column()
    active: boolean;

    @OneToMany(() => Charge, (charge) => charge.plan)
    charge: Charge[]

    // @OneToMany(() => Language, (language) => language.plan)
    // language: Language[]
}