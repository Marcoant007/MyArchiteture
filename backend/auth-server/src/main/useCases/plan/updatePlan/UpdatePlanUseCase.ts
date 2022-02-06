import { Failure } from "@errors/Failure";
import { Plan } from "@models/Plan";
import { StatusEnum } from "@models/UserStatusEnum";
import IPlanRepository from "@repositories/plan/IPlanRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import { PlanDTO } from "src/main/dto/PlanDTO";
import IUpdatedPlanUseCase from "./IUpdatePlanUseCase";

@injectable()
class UpdatePlanUseCase implements IUpdatedPlanUseCase {

    constructor(
        @inject(TYPES.planRepository)
        private readonly planRepository: IPlanRepository
    ) {}

    public async execute(planDTO: PlanDTO, id: number) {
        const planDB = await this.findUserByID(id);
        
        if(!planDB){
            throw Failure.PlanNotExist
        }

        this.updatePlanFields(planDB, planDTO);
        await this.planRepository.update(planDB);

    }

    public async updatePlanFields(planDB: Plan, planDTO:PlanDTO){
        planDB.name = planDTO.name;
        planDB.value = planDTO.value;
        planDB.monthly_value = planDTO.monthly_value;
        planDB.users = planDTO.users;
        planDB.validity = planDTO.validity;
        planDB.description = planDTO.description;
        planDB.active = planDTO.active;

        if (planDTO.status === StatusEnum.Habilitado) {
            planDB.active = true;
        } else if (planDTO.status === StatusEnum.Desabilitado) {
            planDB.active = false;
        } else if (planDTO.status === StatusEnum.Bloqueado) {
            planDB.active = false;
        }
    }


    public async findUserByID(id: number):Promise<Plan>{
        const plaDB = await this.planRepository.findById(id);

        if(!plaDB.right()){
            throw Failure.PlanNotExist;
        }

        return plaDB.right();
    }

}

export default UpdatePlanUseCase;