import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { Charge } from "@models/Charge";

export default interface IChargeRepository {
    setPagination(pagination: Pagination): void;
    findChargesByOrganization(id: number, chargeType: string): Promise<Either<Failure, { chargesDb: Charge[], count: number } | undefined>>;
}