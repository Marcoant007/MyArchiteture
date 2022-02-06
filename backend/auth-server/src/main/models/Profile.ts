import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HelpHasProfile } from "./HelpHasProfile";

@Entity("profile")
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column("character varying", { name: "name", length: 255 })
    name: string;

    @OneToMany(() => HelpHasProfile, (helpHasProfile) => helpHasProfile.profile)
    helpHasProfiles: HelpHasProfile[];
}