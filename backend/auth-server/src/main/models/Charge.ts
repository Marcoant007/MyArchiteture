import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreditCard } from "./CreditCard";
import { Organization } from "./Organization";
import { Plan } from "./Plan";

@Entity("charge")
export class Charge {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column()
    value: number;

    @Column()
    billing_date: Date;

    @Column()
    expiration_date: Date;

    @Column()
    payment_date: Date;

    @Column()
    status: string;

    @OneToOne(() => Organization)
    @JoinColumn({ name: "organization_id" })
    organization: Organization;

    @ManyToOne(() => CreditCard, (credit_card) => credit_card.charge, { eager: true, cascade: true })
    @JoinColumn({ name: "credit_card_id" })
    creditCard: CreditCard;

    @ManyToOne(() => Plan, (plan) => plan.charge, { eager: true, cascade: true })
    @JoinColumn({ name: "plan_id" })
    plan: Plan;


}