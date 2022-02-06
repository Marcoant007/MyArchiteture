import { controller, httpGet, httpPut, requestBody, requestParam, response } from "inversify-express-utils";
import * as express from "express";
import { inject } from "inversify";
import TYPES from "@types";
import IFindLanguagesUseCase from "@useCases/languages/findLanguages/IFindLanguagesUseCase";
import IFindLanguagesEnableUseCase from "@useCases/languages/findLanguagesEnable/IFindLanguagesEnableUseCase";
import IChangeStatusLanguageUseCase from "@useCases/languages/chageStatusLanguage/IChangeStatusLanguageUseCase";

@controller("/languages")
export default class LanguagesController {
    constructor(
        @inject(TYPES.findLanguagesUseCase)
        private readonly findLanguagesUseCase: IFindLanguagesUseCase,
        @inject(TYPES.findLanguagesEnableUseCase)
        private readonly findLanguagesEnableUseCase: IFindLanguagesEnableUseCase,
        @inject(TYPES.changeStatusLanguageUseCase)
        private readonly changeStatusLanguageUseCase: IChangeStatusLanguageUseCase
    ) {
    }

    @httpGet("/")
    public async getLanguages(
        @response() res: express.Response
    ) {
        try {
            const response = await this.findLanguagesUseCase.execute();
            return res.json(response);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpGet("/findEnable")
    public async getLanguagesEnable(
        @response() res: express.Response
    ) {
        try {
            const response = await this.findLanguagesEnableUseCase.execute();
            return res.json(response);
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    }

    @httpPut("/changeStatus/:id")
    public async changeStatusLanguage(
        @response() res: express.Response,
        @requestParam("id") id: number,
        @requestBody() body: any
    ) {
        try {
            let status = body.status;
            const response = await this.changeStatusLanguageUseCase.execute(id, status);
            return res.json(response);
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }
}