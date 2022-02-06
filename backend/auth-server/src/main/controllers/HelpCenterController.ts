import { HelpPages } from "@models/HelpPages";
import { UserTypeEnum } from "@models/UserTypeEnum";
import IHelpCenterRepository from "@repositories/helpCenter/IHelpCenterRepository";
import TYPES from "@types";
import IFindHelpCenterByIDUseCase from "@useCases/helpCenter/IFindHelpCenterByIDUseCase";
import IFindHelpCenterUseCase from "@useCases/helpCenter/IFindHelpCenterUseCase";
import express from "express";
import { inject } from "inversify";
import { controller, httpGet, queryParam, requestParam, response } from "inversify-express-utils";
import { MulterMiddleware } from "src/shared/http/middleware/MulterMiddleware";
import HelpPagesDTO from "../dto/HelpPagesDTO";
@controller("/helpCenter")
export default class HelpCenterController {
    
    constructor(
        @inject(TYPES.findHelpCenterUseCase)
        private readonly findHelpCenterUseCase: IFindHelpCenterUseCase,
        @inject(TYPES.findHelpCenterByIdUseCase)
        private readonly findHelpCenterByIdUseCase: IFindHelpCenterByIDUseCase,
        
    ) { 
        
    }

    @httpGet("")
    public async findHelpCenter(
        @response() res: express.Response,
        @queryParam("page") page: number,
        @queryParam("limit") limit: number,
        @queryParam("profile") profile: HelpPagesDTO,
        @queryParam("language") language: string,
    ) {
        try {
            const markdown = await this.findHelpCenterUseCase.execute(profile, language, page, limit)
            return res.json(markdown)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpGet("/:id")
    public async findHelpCenterById(
        @response() res: express.Response,
        @requestParam("id") id: number
    ) {
        try {
            const findHelpCenterById = await this.findHelpCenterByIdUseCase.execute(id);
            return res.json(findHelpCenterById)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }
}