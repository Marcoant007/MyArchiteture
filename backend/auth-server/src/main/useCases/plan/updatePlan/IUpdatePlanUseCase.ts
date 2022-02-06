import { PlanDTO } from "src/main/dto/PlanDTO";

export default interface IUpdatedPlanUseCase {
    execute(planDTO: PlanDTO, id: number)
}