import { Charge } from "@models/Charge";
import { CreditCard } from "@models/CreditCard";
import { Organization } from "@models/Organization";
import { Plan } from "@models/Plan";

export default class ChargeDTO {
    id: number;
    value: number;
    billing_date: Date;
    expiration_date: Date;
    payment_date: Date;
    status: string;
    organization: Organization;
    creditCard: CreditCard;
    plan: Plan

    constructor(charge: Charge) {
        this.id = charge.id;
        this.value = charge.value;
        this.billing_date = charge.billing_date;
        this.expiration_date = charge.expiration_date;
        this.payment_date = charge.payment_date;
        this.status = charge.status;
        this.organization = charge.organization;
        this.creditCard = charge.creditCard;
        this.plan = charge.plan;
    }
}