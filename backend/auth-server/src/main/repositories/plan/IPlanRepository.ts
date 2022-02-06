import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Plan } from "@models/Plan";
import { PlanDTO } from "src/main/dto/PlanDTO";

export default interface IPlanRepository {

    setPagination(pagination: Pagination): void;

    save(plan: Plan): Promise<Either<Failure, Plan>>;

    find(): Promise<Either<Failure, { planDB: Plan[], count: number } | undefined>>;

    findByName(name: string): Promise<Either<Failure, PlanDTO>>;

    findById(id: number): Promise<Either<Failure, Plan>>;

    update(plan: Plan): Promise<Either<Failure, Boolean>>;

}