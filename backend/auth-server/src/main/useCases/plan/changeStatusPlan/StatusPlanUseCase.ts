import { Failure } from "@errors/Failure";
import { Plan } from "@models/Plan";
import { StatusEnum } from "@models/UserStatusEnum";
import IPlanRepository from "@repositories/plan/IPlanRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IStatusPlanUseCase from "./IStatusPlanUseCase";

@injectable()

class StatusPlanUseCase implements IStatusPlanUseCase {

    constructor(
        @inject(TYPES.planRepository)
        private readonly planRepository: IPlanRepository
    ){}

    public async execute(id: number, status: StatusEnum): Promise<Plan> {
        const plan = await this.planRepository.findById(id);
        const planDB = plan.right();

        if(!planDB){
            throw Failure.userNotExists;
        }

        if (status === StatusEnum.Habilitado) {
            planDB.active = true;
        } else if (status === StatusEnum.Desabilitado) {
            planDB.active = false;
        } else if (status === StatusEnum.Bloqueado) {
            planDB.active = false;
        }

        await this.planRepository.update(planDB);
        const planResult = await this.planRepository.findById(id);
        return planResult.right();

    }
}

export default StatusPlanUseCase;