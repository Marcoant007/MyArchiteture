import { InstituitionStatusEnum } from "@models/InstituitionStatusEnum";
import { Organization } from "@models/Organization";
import UserDTO from "./UserDTO";

export default class InstituitionAdminDTO {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    active: boolean;
    blocked: boolean;
    status: InstituitionStatusEnum;
    cnpj: string;
    urlLogo: string;
    code: string;
    cellPhone: string;
    comercial_phone: string;
    email: string;
    description: string;
    companyName: string;
    stateRegistration: string;
    responsible: string;
    languages: any[];

    constructor(organization: Organization) {
        this.id = organization.id;
        this.createdAt = organization.createdAt;
        this.updatedAt = organization.updatedAt;
        this.name = organization.name;
        this.active = organization.active;
        this.cnpj = organization.cnpj;
        this.urlLogo = organization.urlLogo;
        this.code = organization.code;
        this.cellPhone = organization.cellPhone;
        this.comercial_phone = organization.comercialPhone;
        this.email = organization.email;
        this.description = organization.description;
        this.companyName = organization.companyName;
        this.stateRegistration = organization.stateRegistration;
        this.responsible = organization.responsible;
        this.languages = organization.languages;
    }
}