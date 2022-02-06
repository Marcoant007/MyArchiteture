import { PlanDTO } from "src/main/dto/PlanDTO";

export default interface IFindPlanUseCase {
    execute(page,limit):Promise<{plans:PlanDTO[], count:number}>    
}