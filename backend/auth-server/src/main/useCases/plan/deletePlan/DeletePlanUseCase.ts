import { Failure } from "@errors/Failure";
import PlanRepository from "@repositories/plan/PlanRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IDeletePlanUseCase from "./IDeletePlanUseCase";

@injectable()
export default class DeletePlanUseCase implements IDeletePlanUseCase {
    constructor(
        @inject(TYPES.planRepository)
        private readonly planRepository: PlanRepository
    ) {
    }

    public async execute(id: number) {
        const plan = await this.planRepository.findById(id);
        const planDB = plan.right();

        if (!planDB) {
            throw Failure.PlanNotExist;
        }

        if (!planDB.active) {
            throw Failure.PlanDeleteError;
        }

        planDB.active = false;

        await this.planRepository.update(planDB);
    }
}