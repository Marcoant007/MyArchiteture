import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HelpHasProfile } from "./HelpHasProfile";
import { Language } from "./Language";

@Entity("help_pages")
export class HelpPages {

    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;
  
    @Column("character varying", { name: "title", length: 255 })
    title: string;
  
    @Column("character varying", { name: "filename", length: 255 })
    filename: string;
  
    @Column("character varying", { name: "code", length: 255 })
    code: string;
  
    @OneToMany(() => HelpHasProfile, (helpHasProfile) => helpHasProfile.help)
    helpHasProfiles: HelpHasProfile[];
  
    @ManyToOne(() => Language, (language) => language.helpPages)
    @JoinColumn([{ name: "language_id", referencedColumnName: "id" }])
    language: Language;
}