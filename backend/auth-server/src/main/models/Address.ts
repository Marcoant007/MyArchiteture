import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { City } from "./City";
import { User } from "./User";

@Entity("address")
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({ name: "zip_code" })
    zipCode: string;

    @Column({ name: "number_address" })
    numberAddress: string;

    @Column()
    complement: string;

    @Column({ name: "city_id" })
    cityId: string;

    @Column({ name: "street_name" })
    streetName: string;

    @ManyToOne(() => City, (city) => city.id)
    @JoinColumn({ name: "city_id" })
    city: City;

    @OneToOne(type => User, address => Address)
    userAddress: User;
}