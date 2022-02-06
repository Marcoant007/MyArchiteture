import { PlanDTO } from "src/main/dto/PlanDTO";

export default interface IFindPlanByIdUseCase {
    execute(id: number): Promise<PlanDTO | undefined>;
}