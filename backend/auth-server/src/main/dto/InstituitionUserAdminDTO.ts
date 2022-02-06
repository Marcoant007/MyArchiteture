import { User } from "@models/User";
import { StatusEnum } from "@models/UserStatusEnum";
import { UserTypeEnum } from "@models/UserTypeEnum";
import AddressDTO from "./AddressDTO";

export default class InstituitionUserAdminDTO {
    nameEducationalInstitution: string;
    nameUser: string;
    name: string;
    email: string;
    administrator?: boolean
    cpf?: string;
    urlLogo: String;
    registration?: string;
    userType?: UserTypeEnum
    cellPhone?: string;
    streetName?: string;
    complement?: string;
    numberAddress?: string
    zipCode?: string;
    address?: AddressDTO;
    status?: StatusEnum;

    constructor(user: User) {
        this.name = user.name;
        this.registration = user.registration;
        this.userType = user.userType;
        this.cellPhone = user.cellPhone;
        if (this.address) {
            this.address = user.address;
        }
    }
}