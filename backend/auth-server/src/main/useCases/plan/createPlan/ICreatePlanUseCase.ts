import { Plan } from "@models/Plan";
import { PlanDTO } from "src/main/dto/PlanDTO";

export default interface ICreatePlanUseCase {
    execute(planDTO: PlanDTO):Promise<Plan>
}