import { Plan } from "@models/Plan";

export default interface IStatusPlanUseCase {
    execute(id: number, status: string): Promise<Plan>;
}