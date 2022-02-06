import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HelpPages } from "./HelpPages";
import { Profile } from "./Profile";

@Entity("help_has_profile")
export class HelpHasProfile {

    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    // @Column({ name: "help_id" })
    // helpId: number;

    // @Column({ name: "profile_id" })
    // profileId: number;

    @ManyToOne(() => HelpPages, (helpPages) => helpPages.helpHasProfiles)
    @JoinColumn([{ name: "help_id", referencedColumnName: "id" }])
    help: HelpPages;
  
    @ManyToOne(() => Profile, (profile) => profile.helpHasProfiles)
    @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
    profile: Profile;

}