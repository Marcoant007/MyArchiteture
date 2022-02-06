import { UserTypeEnum } from "./UserTypeEnum";

export default class PlanDTO {
    name: string;
    value: number;
    monthly_value: number;
    users: number;
    validity: any;
    description: string;
    active: boolean;
    status?: string;
}