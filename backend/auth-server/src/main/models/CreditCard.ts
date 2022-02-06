import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Charge } from "./Charge";
import { Organization } from "./Organization";

@Entity("credit_card")
export class CreditCard {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column()
    created_by: number;

    @Column()
    name: string;

    @Column()
    month: number;

    @Column()
    number: string;

    @Column()
    year: number;

    @Column()
    code: string;

    @Column()
    status: string;

    @Column()
    default_card: boolean;

    @OneToOne(() => Organization)
    @JoinColumn({ name: "organization_id" })
    organization: Organization;

    @OneToMany(() => Charge, (charge) => charge.creditCard)
    charge: Charge[]
}