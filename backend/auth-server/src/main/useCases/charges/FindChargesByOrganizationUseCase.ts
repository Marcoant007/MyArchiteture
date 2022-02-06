import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import IChargeRepository from "@repositories/charges/IChargesRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import ChargeDTO from "src/main/dto/ChargeDTO";
import IFindChargesByOrganizationUseCase from "./IFindChargesByOrganizationUseCase";

@injectable()
class FindChargesByOrganizationUseCase implements IFindChargesByOrganizationUseCase {
    constructor(
        @inject(TYPES.chargesRepository)
        private readonly chargeRepository: IChargeRepository
    ) { }

    async execute(configPagination: any): Promise<{ charges: ChargeDTO[]; count: number; }> {
        const { page, limit, chargeType, idOrganization } = configPagination;
        const pagination = new Pagination(limit, page);
        this.chargeRepository.setPagination(pagination);

        const resultDb = await this.chargeRepository.findChargesByOrganization(idOrganization, chargeType);
        const { chargesDb, count } = resultDb.right();

        if (resultDb.isLeft()) {
            throw Failure.chargeErrorFindByOrganization;
        }

        const charges = chargesDb.map(charge => new ChargeDTO(charge));
        const response = { charges, count };

        return response;
    }
}

export default FindChargesByOrganizationUseCase;