import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./Address";
import { Organization } from "./Organization";
import { UserHasGroup } from "./UserHasGroup";
import { UserTypeEnum } from "./UserTypeEnum";

@Index("pk_user", ["id"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @Column({ name: "first_acess" })
  firstAcess: boolean;

  @Column()
  email: string;

  @Column({ name: "cellphone" })
  cellPhone: string;

  @Column({ name: "birth_date" })
  birthDate: Date;

  @Column({ name: "comercial_phone" })
  comercialPhone: string;

  @OneToOne(type => Address, userAddress => User, { eager: true })
  @JoinColumn({ name: "address_id" })
  address: Address;

  @Column({ name: "temporary_password" })
  temporaryPassword: boolean;

  @Column()
  cpf: string;

  @Column({
    name: "user_type",
    type: "enum",
    enum: UserTypeEnum
  })
  userType: UserTypeEnum;

  @Column()
  registration: string;

  @Column()
  blocked: boolean;

  @Column()
  attempt: number | null;

  @Column({ name: "email_checked" })
  emailChecked: boolean;

  @Column({ name: "url_img" })
  urlImg: string | null;

  @Column()
  code: string;

  @ManyToOne(() => Organization, (organization) => organization.users, { eager: true, cascade: true })
  @JoinColumn({ name: "organization_id" })
  organization: Organization;

  @OneToMany(() => UserHasGroup, (userHasGroup) => userHasGroup.user)
  userHasGroups: UserHasGroup[];

  @Column()
  deleted: boolean = false;
}
