import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Organization } from "./Organization";

@Entity()
export class StatusOrganization {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;


  @Column("character varying", { name: "status", length: 50 })
  status: string;

  @OneToMany(
    () => Organization,
    (organization) => organization.statusOrganization
  )
  organizations: Organization[];
}
