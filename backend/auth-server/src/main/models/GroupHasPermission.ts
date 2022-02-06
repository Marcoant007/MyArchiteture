import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "./Group";
import { Permission } from "./Permission";
@Entity()
export class GroupHasPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int4')
  group_id: number;

  @ManyToOne(() => Group, (group) => group.groupHasPermissions)
  @JoinColumn({ name: "group_id"})
  group: Group;

  @Column('int4')
  permission_id: number;

  @ManyToOne(() => Permission, {eager: true})
  @JoinColumn({ name: "permission_id"})
  permission: Permission;
}
