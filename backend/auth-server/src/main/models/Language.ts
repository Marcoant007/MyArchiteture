import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HelpPages } from "./HelpPages";
import { OrganizationHasLanguage } from "./OrganizationHasLanguage";
import { Plan } from "./Plan";
@Entity("language")
export class Language {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: "img_ico" })
    imgIco: string;

    @Column()
    enable: boolean;

    @OneToOne(type => HelpPages, language => Language)
    helpPages: HelpPages;

    @OneToMany(() => OrganizationHasLanguage, (organizationHasLanguage) => organizationHasLanguage.language)
    organizations: OrganizationHasLanguage[];

    // @ManyToOne(() => Plan, (plan) => plan.language, { eager: true, cascade: true })
    // @JoinColumn({ name: "plan_id" })
    // plan: Plan;
}