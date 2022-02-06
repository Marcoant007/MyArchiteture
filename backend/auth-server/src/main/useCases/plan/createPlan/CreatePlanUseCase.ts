import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Plan } from "@models/Plan";
import { StatusEnum } from "@models/UserStatusEnum";
import IPlanRepository from "@repositories/plan/IPlanRepository";
import TYPES from "@types";
import exp from "constants";
import { inject, injectable } from "inversify";
import { PlanDTO } from "src/main/dto/PlanDTO";
import ICreatePlanUseCase from "./ICreatePlanUseCase";

@injectable()
class CreatePlanUseCase implements ICreatePlanUseCase {
    constructor(
        @inject(TYPES.planRepository)
        private readonly planRepository: IPlanRepository,
    ) {
    }

    public async execute(planDTO: PlanDTO): Promise<Plan> {

        let plan: Plan = new Plan();
        plan.name = planDTO.name;
        plan.value = planDTO.value;
        plan.monthly_value = planDTO.monthly_value;
        plan.users = planDTO.users;
        plan.validity = planDTO.validity;
        plan.description = planDTO.description

        if (planDTO.status === StatusEnum.Habilitado) {
            plan.active = true;
        }

        if (planDTO.status === StatusEnum.Desabilitado) {
            plan.active = false;
        }

        const planAlreadyExists  =  await this.planRepository.findByName(plan.name);

        if(planAlreadyExists.right()){
            throw Failure.PlanAlreadyExists
        }

        let planSaveDB: Either<Failure, Plan> = await this.planRepository.save(plan);
        let planSaved = planSaveDB.right();

        return planSaved

    }
}

export default CreatePlanUseCase;