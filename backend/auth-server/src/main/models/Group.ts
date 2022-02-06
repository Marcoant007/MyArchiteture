import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Organization } from "./Organization";
import { GroupHasPermission } from "./GroupHasPermission";
import { UserHasGroup } from "./UserHasGroup";

@Entity("group")
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column()
  name: string;

  @ManyToOne(() => Organization, (organization) => organization.groups)
  @JoinColumn({ name: "organization_id" })
  organization: Organization;

  @OneToMany(() => GroupHasPermission,(groupHasPermission) => groupHasPermission.group, {eager: true})
  groupHasPermissions: GroupHasPermission[];

  @OneToMany(() => UserHasGroup, (userHasGroup) => userHasGroup.group)
  users: UserHasGroup[];
}
