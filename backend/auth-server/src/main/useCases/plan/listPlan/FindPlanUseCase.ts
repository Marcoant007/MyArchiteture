import { Pagination } from "@database/Pagination";
import IPlanRepository from "@repositories/plan/IPlanRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import { PlanDTO } from "src/main/dto/PlanDTO";
import IFindPlanUseCase from "./IFindPlanUseCase";

@injectable()
class FindPlanUseCase implements IFindPlanUseCase {

    constructor(
        @inject(TYPES.planRepository)
        private readonly planRepository: IPlanRepository
    ) { }

    public async execute(page,limit):Promise<{plans:PlanDTO[], count:number}>{
        const pagination = new Pagination(page, limit);
        this.planRepository.setPagination(pagination);
        const planRepository = await this.planRepository.find();  
        const{ planDB, count } = planRepository.right();
        const plans = planDB.map(plan => new PlanDTO(plan));
        const response = { plans, count};
        return response;
    }

}

export default FindPlanUseCase;