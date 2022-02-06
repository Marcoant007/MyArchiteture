import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { GroupHasPermission } from "./GroupHasPermission";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  active: boolean;

  @OneToMany(
    () => GroupHasPermission,
    (groupHasPermission) => groupHasPermission.permission
  )
  groupHasPermissions: GroupHasPermission[];
}
