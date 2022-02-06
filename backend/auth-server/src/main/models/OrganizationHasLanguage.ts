import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Language } from "./Language";
import { Organization } from "./Organization";

@Entity()
export class OrganizationHasLanguage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Language, (language) => language.organizations, { eager: true, cascade: true })
    @JoinColumn({ name: "language_id" })
    language: Language;

    @ManyToOne(() => Organization, (organization) => organization.languages, { eager: true })
    @JoinColumn({ name: "organization_id" })
    organization: Organization;
}