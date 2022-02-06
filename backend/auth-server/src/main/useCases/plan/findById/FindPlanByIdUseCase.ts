import { Failure } from "@errors/Failure";
import IPlanRepository from "@repositories/plan/IPlanRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import { PlanDTO } from "src/main/dto/PlanDTO";
import IFindPlanByIdUseCase from "./IFindPlanByIdUseCase";

@injectable()
export default class FindPlanByIdUseCase implements IFindPlanByIdUseCase {
    constructor(
        @inject(TYPES.planRepository)
        private readonly planRepository: IPlanRepository
    ) {
    }

    async execute(id: number): Promise<PlanDTO> {
        let idPlan = id;
        const resultDb = await this.planRepository.findById(idPlan);

        if (resultDb.isLeft()) {
            throw Failure.PlanFindError;
        }

        const planDb = resultDb.right();

        return planDb
    }
}