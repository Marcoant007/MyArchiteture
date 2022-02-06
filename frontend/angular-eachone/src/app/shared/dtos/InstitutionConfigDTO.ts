import { InstitutionStatusEnum } from "../Enum/InstitutionStatusEnum";
export default class InstitutionConfigDTO {
    id: number;
    name: string;
    cnpj: string;
    urlLogo: string;
    active: boolean;
    code: string;
    description: string;
    responsible: string;
    companyName: string;
    status?: InstitutionStatusEnum;
    stateRegistration: string;
    cellPhone: string;
    comercialPhone: string;
    email: string;
    languages: any[];

    constructor() {
    }
}