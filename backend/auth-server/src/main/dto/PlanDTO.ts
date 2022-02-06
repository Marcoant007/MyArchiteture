import { Plan } from "@models/Plan";
import { StatusEnum } from "@models/UserStatusEnum";

export class PlanDTO {
    id: number;
    name: string;
    value: number;
    monthly_value: number;
    users: number;
    validity: Date;
    description: string;
    active: boolean;
    language_id?: any;
    charge?: any;
    status?: StatusEnum;

    constructor(plan: Plan) {
        this.id = plan.id;
        this.name = plan.name;
        this.value = plan.value;
        this.monthly_value = plan.monthly_value;
        this.users = plan.users;
        this.validity = new Date(this.validity);
        this.description = plan.description;
        this.active = plan.active;
        // this.charge = plan.charge;
    }
}