import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "./Group";
import { User } from "./User";

@Entity()
export class UserHasGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, (group) => group.users, { eager: true, cascade: true })
  @JoinColumn({ name: "group_id" })
  group: Group;

  @ManyToOne(() => User, (user) => user.userHasGroups, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;
}
