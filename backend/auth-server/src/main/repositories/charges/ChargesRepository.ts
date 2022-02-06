import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Charge } from "@models/Charge";
import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import IChargeRepository from "./IChargesRepository";

@injectable()
class ChargeRepository implements IChargeRepository {

    private ormRepository: Repository<Charge>;
    private pagination: Pagination;

    constructor() {
        this.ormRepository = getRepository(Charge);
    }

    public setPagination(pagination: Pagination) {
        this.pagination = pagination;
    }

    async findChargesByOrganization(id: number, chargeType: string): Promise<Either<Failure, { chargesDb: Charge[]; count: number; }>> {
        try {
            const offset = this.pagination.offset();
            const limit = this.pagination.limit();

            const query = await this.ormRepository
                .createQueryBuilder("charge")
                .leftJoinAndSelect('charge.creditCard', 'creditCard')
                .leftJoinAndSelect('charge.plan', 'plan')
                .where("charge.organization_id = :id", { id: id })
                .limit(limit)
                .offset(offset)

            if (chargeType === 'Data') {
                query.orderBy(`charge.billing_date`, "DESC");
            }

            if (chargeType === 'Valor') {
                query.orderBy(`charge.value`, "DESC");
            }

            if (chargeType === 'Cartão') {
                query.orderBy(`charge.creditCard`, "DESC");
            }

            const [chargesDb, count] = await query.getManyAndCount();
            return Either.right({ chargesDb, count })
        } catch (error) {
            return Either.left(error.message);
        }
    }
}

export default ChargeRepository;