import TYPES from "@types";
import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    httpPut,
    queryParam,
    requestBody,
    requestParam,
    request,
    response,
    httpDelete,
    next,
} from "inversify-express-utils";

import { StatusEnum } from "@models/UserStatusEnum";
import UserDTO from "../dto/UserDTO";

import fs from "fs";
import busboy from "busboy";
import multer from "multer";
import Pino from "@util/Pino";
import IFindUserUseCase from "@useCases/user/findUser/IFindUserUseCase";
import IFindUserTypesUseCase from "@useCases/user/findUserTypes/IFindUserTypesUseCase";
import IFindUserByIdUseCase from "@useCases/user/findUserByID/IFindUserByIdUseCase";
import IUpdatedUserUseCase from "@useCases/user/updateUser/IUpdatedUserUseCase";
import ICreateUserUseCase from "@useCases/user/createUser/ICreateUserUseCase";
import IStatusUserUseCase from "@useCases/user/statusUser/IStatusUserUseCase";
import IDeleteUserUseCase from "@useCases/user/deleteUser/IDeleteUserUseCase";
import IImportUserUseCase from "@useCases/user/importUser/IImportUserUseCase";
import IFindUsersByOrganizationUseCase from "@useCases/user/IFindUsersByOrganizationUseCase";
import IConfigUserUseCase from "@useCases/user/configUser/IConfigUserUseCase";

@controller("/users")
export default class UserController {
    constructor(
        @inject(TYPES.findUserUseCase)
        private readonly findUserUseCase: IFindUserUseCase,
        @inject(TYPES.findUserTypesUseCase)
        private readonly findUserTypesUseCase: IFindUserTypesUseCase,
        @inject(TYPES.findUserByIdUseCase)
        private readonly findUserByIdUseCase: IFindUserByIdUseCase,
        @inject(TYPES.createUserUseCase)
        private readonly createUserUseCase: ICreateUserUseCase,
        @inject(TYPES.updatedUserUseCase)
        private readonly updatedUserUseCase: IUpdatedUserUseCase,
        @inject(TYPES.statusUserUseCase)
        private readonly statusUserUseCase: IStatusUserUseCase,
        @inject(TYPES.deleteUserUseCase)
        private readonly deleteUserUseCase: IDeleteUserUseCase,
        @inject(TYPES.findUsersByOrganizationUseCase)
        private readonly findUsersByOrganizationUseCase: IFindUsersByOrganizationUseCase,
        @inject(TYPES.importUserUseCase)
        private readonly importUserUseCase: IImportUserUseCase,
        @inject(TYPES.configUserUseCase)
        private readonly configUserUseCase: IConfigUserUseCase
    ) {
    }

    @httpGet("/")
    public async findAllUsers(
        @response() res: express.Response,
        @request() request: express.Request,
        @queryParam("page") page: number,
        @queryParam("limit") limit: number,
        @queryParam("name") name: string,
        @queryParam("userType") userType: string,
    ) {
        try {
            // const userType = request.userType; 
            const user = await this.findUserUseCase.execute(page, limit, name, userType);
            return res.json(user)
        } catch (error) {
            console.log(error)
            res.status(error.statusCode).send(error);
        }
    }

    @httpGet("/change-status/:id/:status")
    public async changeStatus(
        @response() res: express.Response,
        @requestParam("id") id: number,
        @requestParam("status") status: StatusEnum,
    ) {
        try {
            const user = await this.statusUserUseCase.execute(+id, status)
            return res.json(user)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpPost("")
    public async createUser(
        @response() res: express.Response,
        @requestBody() userDTO: UserDTO
    ) {
        try {
            const result = await this.createUserUseCase.execute(userDTO);
            return res.json(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }


    @httpPut("/:id")
    public async updatedUser(
        @response() res: express.Response,
        @requestBody() userDTO: UserDTO,
        @requestParam("id") id: number
    ) {
        try {
            const updatedUser = await this.updatedUserUseCase.execute(userDTO, +id)
            return res.status(200).json(updatedUser)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpPut("/configUser/:id")
    public async configUser(
        @response() res: express.Response,
        @requestBody() userDTO: UserDTO,
        @requestParam("id") id: number
    ) {
        try {
            const updateUser = await this.configUserUseCase.execute(userDTO, id);
            return res.json(updateUser);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpPost("/importUser", TYPES.multerMiddleware)
    public async importUser(
        @response() res: express.Response,
        @request() req: express.Request,
    ) {
        try {
            const file = req.file;
            // Aqui está lendo como CSV, porém deve funcionar tanto como CSV, XLS e XLSX e somente esses formatos
            fs.readFileSync("./tmp/" + req.file.filename, { encoding: 'utf-8' });
            const fileUser = await this.importUserUseCase.execute(file)
            return res.send({ data: fileUser });
        } catch (error) {
            const file = req.file;
            const fileUser = await this.importUserUseCase.execute(file)
            res.status(400).send(error);
        }
    }

    @httpGet("/userTypes")
    public async userTypes(
        @response() res: express.Response,
    ) {
        try {
            const userTypes = await this.findUserTypesUseCase.execute()
            return res.json(userTypes)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpGet("/:id")
    public async findById(
        @response() res: express.Response,
        @requestParam("id") id: number,
    ) {
        try {
            const findUserById = await this.findUserByIdUseCase.execute(id);
            return res.json(findUserById)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpGet("/usersByOrganizations/:id")
    public async findUsersByOrganization(
        @response() res: express.Response,
        @requestParam("id") id: number,
        @queryParam("page") page: number,
        @queryParam("limit") limit: number,
        @queryParam("name") name: string,
        @queryParam("userType") userType: string,
    ) {
        try {
            let configPagination = Object()
            configPagination.idOrganization = id;
            configPagination.page = page;
            configPagination.limit = limit;
            configPagination.name = name;
            configPagination.userType = userType;

            const response = await this.findUsersByOrganizationUseCase.execute(configPagination);

            return res.json(response)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpDelete("/:id")
    public async delete(
        @response() res: express.Response,
        @requestParam("id") id: number,
    ) {
        try {
            const user = await this.deleteUserUseCase.execute(+id)
            return res.json(user)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }
}