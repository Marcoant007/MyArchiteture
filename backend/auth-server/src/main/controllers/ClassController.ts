import TYPES from "@types";
import { httpDelete, httpGet, httpPut, queryParam, requestBody, requestParam, response } from "inversify-express-utils";
import { inject } from "inversify";
import express from "express";
import { controller, httpPost } from "inversify-express-utils";
import ClassDTO from "../dto/ClassDTO";
import ICreateClassUseCase from "@useCases/class/createClass/ICreateClassUseCase";
import IFindClassUseCase from "@useCases/class/findClass/IFindClassUseCase";
import IUpdateClassUseCase from "@useCases/class/updateClass/IUpdateClassUseCase";
import IFindClassByIdUseCase from "@useCases/class/findClassById/IFindClassByIdUseCase";
import IDeleteClassUseCase from "@useCases/class/deleteClass/IDeleteClassUseCase";

@controller("/class")
export default class ClassController {
    constructor(
        @inject(TYPES.createClassUseCase)
        private readonly createClassUseCase: ICreateClassUseCase,
        @inject(TYPES.findClassUseCase)
        private readonly findClassUseCase: IFindClassUseCase,
        @inject(TYPES.updateClassUseCase)
        private readonly updateClassUseCase: IUpdateClassUseCase,
        @inject(TYPES.findClassByIdUseCase)
        private readonly findClassByIdUseCase: IFindClassByIdUseCase,
        @inject(TYPES.deleteClassUseCase)
        private readonly deleteClassUseCase: IDeleteClassUseCase
    ) { }

    @httpGet("/")
    public async listClass(
        @response() res: express.Response,
        @queryParam("page") page: number,
        @queryParam("limit") limit: number
    ) {
        try {
            const classReponse = await this.findClassUseCase.execute(page, limit);
            return res.status(200).json(classReponse)
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }

    @httpGet("/:id")
    public async getClassById(
        @response() res: express.Response,
        @requestParam("id") id: number
    ) {
        try {
            const classDB = await this.findClassByIdUseCase.execute(id);
            return res.json(classDB)
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }

    @httpPost("/")
    public async createClass(
        @response() res: express.Response,
        @requestBody() classDTO: ClassDTO
    ) {
        try {
            const classResponse = await this.createClassUseCase.execute(classDTO);
            return res.status(200).json(classResponse)
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }

    @httpPut("/:id")
    public async updateClass(
        @response() res: express.Response,
        @requestBody() classDTO: ClassDTO,
        @requestParam("id") id: number
    ) {
        try {
            const updateClass = await this.updateClassUseCase.execute(classDTO, +id);
            return res.json(updateClass)
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }

    @httpDelete("/:id")
    public async delete(
        @response() res: express.Response,
        @requestParam("id") id: number
    ) {
        try {
            await this.deleteClassUseCase.execute(id);
            return res.json({ message: "Classe deletada com sucesso!" })
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
}