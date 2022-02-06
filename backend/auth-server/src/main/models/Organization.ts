import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Charge } from "./Charge";
import { Group } from "./Group";
import { OrganizationHasLanguage } from "./OrganizationHasLanguage";
import { StatusOrganization } from "./StatusOrganization";
import { Tenant } from "./Tenant";
import { User } from "./User";


@Entity("organization")
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column({ name: "url_logo" })
  urlLogo: string | null;

  @Column()
  active: boolean;

  @Column()
  code: string;

  @Column()
  blocked: boolean;

  @Column()
  description: string;

  @Column()
  responsible: string;

  @Column({ name: "company_name" })
  companyName: string | null;

  @Column({ name: "state_registration" })
  stateRegistration: string;

  @Column({ name: "cell_phone" })
  cellPhone: string | null;

  @Column({ name: "comercial_phone" })
  comercialPhone: string | null;

  @Column()
  email: string | null;

  @OneToMany(() => Group, (group) => group.organization)
  groups: Group[];

  @ManyToOne(
    () => StatusOrganization,
    (statusOrganization) => statusOrganization.organizations
  )
  @JoinColumn([{ name: "status_organization_id", referencedColumnName: "id" }])
  statusOrganization: StatusOrganization;

  @OneToMany(() => Tenant, (tenant) => tenant.organization)
  tenants: Tenant[];

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @OneToMany(() => OrganizationHasLanguage, (organizationHasLanguage) => organizationHasLanguage.organization)
  languages: OrganizationHasLanguage[];

  @OneToMany(() => Charge, (charge) => charge.organization)
  charges: Charge[]
}
