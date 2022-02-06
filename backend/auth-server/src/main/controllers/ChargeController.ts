import TYPES from "@types";
import IFindChargesByOrganizationUseCase from "@useCases/charges/IFindChargesByOrganizationUseCase";
import * as express from "express";
import { inject } from "inversify";
import { controller, httpGet, queryParam, requestParam, response } from "inversify-express-utils";

@controller("/charge")
export default class ChargeController {
    constructor(
        @inject(TYPES.findChargesByOrganizationUseCase)
        private readonly findChargesByOrganizationUseCase: IFindChargesByOrganizationUseCase
    ) { }

    @httpGet("/chargeByOrganizations/:id")
    public async findChargesByOrganization(
        @response() res: express.Response,
        @requestParam("id") id: number,
        @queryParam("page") page: number,
        @queryParam("limit") limit: number,
        @queryParam("chargeType") chargeType: string,
    ) {
        try {
            let configPagination = Object()
            configPagination.idOrganization = id;
            configPagination.page = page;
            configPagination.limit = limit;
            configPagination.chargeType = chargeType;

            const response = await this.findChargesByOrganizationUseCase.execute(configPagination);
            return res.json(response);
        } catch (error) {
            res.status(400).json(error.statusCode);
        }
    }
}