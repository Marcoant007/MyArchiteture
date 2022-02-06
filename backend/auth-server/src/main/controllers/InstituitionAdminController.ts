import TYPES from "@types";
import IDeleteInstituitionUseCase from "@useCases/InstituitionAdmin/IDeleteInstituitionUseCase";
import IFindInstituitionByIdUseCase from "@useCases/InstituitionAdmin/IFindInstituitionByIdUseCase";
import IFindInstituitionUseCase from "@useCases/InstituitionAdmin/IFindInstituitionUseCase";
import IRegisterInstituitionAndAdminUseCase from "@useCases/InstituitionAdmin/IRegisterInstituitionAndAdminUseCase";
import IUpdateInstitutionUseCase from "@useCases/InstituitionAdmin/IUpdateInstitutionUseCase";
import IUploadImageOrganization from "@useCases/InstituitionAdmin/IUploadImageOrganization";
import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpDelete,
    httpGet,
    request,
    httpPost,
    httpPut,
    queryParam,
    requestBody,
    requestParam,
    response
} from "inversify-express-utils";
import InstituitionAdminDTO from "../dto/InstituitionDTO";
import InstituitionUserAdminDTO from "../dto/InstituitionUserAdminDTO";

@controller("/instituition")
export default class InstituitionAndAdminController {

    constructor(
        @inject(TYPES.registerInstituitionAndAdminUseCase)
        private readonly registerInstuitionAndAdminUseCase: IRegisterInstituitionAndAdminUseCase,
        @inject(TYPES.findInstituitionUsecase)
        private readonly findInstituitionUsecase: IFindInstituitionUseCase,
        @inject(TYPES.deleteInstituitionUseCase)
        private readonly deleteInstituitionUseCase: IDeleteInstituitionUseCase,
        @inject(TYPES.findByIdInstituitionUseCase)
        private readonly findByIdInstituitionUseCase: IFindInstituitionByIdUseCase,
        @inject(TYPES.updateInstitutionUseCase)
        private readonly updatedInstitutionUseCase: IUpdateInstitutionUseCase,
        @inject(TYPES.uploadImageOrganization)
        private readonly uploadImageOrganization: IUploadImageOrganization
    ) { }

    @httpGet("/")
    public async getInstituitions(
        @response() res: express.Response,
        @queryParam("page") page: number,
        @queryParam("limit") limit: number,
    ) {
        try {
            const instituitions = await this.findInstituitionUsecase.execute(page, limit);
            return res.json(instituitions)
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @httpPost("/register")
    public async register(
        @response() res: express.Response,
        @requestBody() instituitionUserAdminDTO: InstituitionUserAdminDTO) {
        try {
            const result = await this.registerInstuitionAndAdminUseCase.execute(instituitionUserAdminDTO)
            return res.json(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpPut("/:id")
    public async update(
        @response() res: express.Response,
        @requestBody() organizationDTO: InstituitionAdminDTO,
        @requestParam("id") id: number
    ) {
        try {
            await this.updatedInstitutionUseCase.execute(organizationDTO, id);
            return res.json({ message: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    @httpDelete("/:id")
    public async delete(
        @response() res: express.Response,
        @requestParam("id") id: number) {
        try {
            await this.deleteInstituitionUseCase.execute(id);
            return res.json({ message: "Organização desabilitada com sucesso!", code: 200 })
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpGet("/:id")
    public async getByIdInstitution(
        @response() res: express.Response,
        @requestParam("id") id: number,) {
        try {
            const resultInstituition = await this.findByIdInstituitionUseCase.execute(id);
            return res.json(resultInstituition);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpPost("/uploadImage/:id", TYPES.multerMiddleware)
    public async uploadImage(
        @response() res: express.Response,
        @request() req: express.Request,
        @requestParam("id") id: number
    ) {
        try {
            const file = req.file;
            const idOrganization = id;
            const response = await this.uploadImageOrganization.execute(file, idOrganization);
            return response
        } catch (error) {
            return error
        }
    }
}