import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Plan } from "@models/Plan";
import { inject, injectable } from "inversify";
import { PlanDTO } from "src/main/dto/PlanDTO";
import { getRepository, Repository } from "typeorm";
import IPlanRepository from "./IPlanRepository";

@injectable()
class PlanRepository implements IPlanRepository {

    private ormRepository: Repository<Plan>;
    private pagination: Pagination;

    constructor() {
        this.ormRepository = getRepository(Plan);
    }

    public setPagination(pagination: Pagination) {
        this.pagination = pagination;
    }

    async save(plan: Plan): Promise<Either<Failure, Plan>> {
        try {
            const planDB = await this.ormRepository.save(plan);
            return Either.right(planDB);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async update(plan: Plan): Promise<Either<Failure, Boolean>>{
        try {
            await this.ormRepository.update(plan.id, plan);
            return Either.right(true);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async find(): Promise<Either<Failure, { planDB: Plan[], count: number } | undefined>> {
        try {
            const offset = this.pagination.offset();
            const limit = this.pagination.limit();

            let query = this.ormRepository.createQueryBuilder("plan")
                .limit(limit)
                .offset(offset)
                .orderBy(`plan.name`, "ASC")
            const [planDB, count] = await query.getManyAndCount();
            return Either.right({ planDB, count })
        } catch (error) {
            return Either.left(error)
        }
    }

    async findByName(name: string): Promise<Either<Failure, PlanDTO>> {
        try {
            const planDB = await this.ormRepository.findOne({
                where: { name: name }
            })
            return Either.right(planDB)
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findById(id: number): Promise< Either<Failure, Plan>>{
        try {
            const planDB = await this.ormRepository.createQueryBuilder("plan")
            .where("plan.id = :id", {id})
            .getOneOrFail();
            return Either.right(planDB);
        } catch (error) {
            return Either.left(error.message)
        }
    }
}

export default PlanRepository;