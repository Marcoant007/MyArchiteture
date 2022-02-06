import { Address } from "@models/Address";
import { Organization } from "@models/Organization";
import { User } from "@models/User";
import { StatusEnum } from "@models/UserStatusEnum";
import { UserTypeEnum } from "@models/UserTypeEnum";
import AddressDTO from "./AddressDTO";
import DefaultDTO from "./DefaultDTO";

export default class UserDTO {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    cpf: string;
    email: string;
    cellPhone?: string;
    registration?: string;
    isNewPassword?: boolean;
    userType?: UserTypeEnum;
    status?: StatusEnum;
    address: Address;
    blocked?: boolean;
    active?: boolean;
    organization?: Organization;
    birthDate: Date;
    password?: string;
    streetName?: string;
    complement?: string;
    numberAddress?: string
    zipCode?: string;
    city?: string;
    firstAcess: boolean;
    temporaryPassword: boolean;
    groups: DefaultDTO[];
    permissions: string[];

    constructor(user: User) {
        this.id = user.id
        this.name = user.name;
        this.email = user.email;
        this.cpf = user.cpf;
        this.cellPhone = user.cellPhone;
        this.registration = user.registration;
        this.userType = user.userType;
        this.address = user.address;
        this.organization = user.organization;
        this.active = user.active;
        this.blocked = user.blocked;
        this.password = user.password;
    }

}