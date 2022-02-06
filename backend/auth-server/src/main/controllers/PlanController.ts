import { StatusEnum } from "@models/UserStatusEnum";
import TYPES from "@types";
import IStatusPlanUseCase from "@useCases/plan/changeStatusPlan/IStatusPlanUseCase";
import ICreatePlanUseCase from "@useCases/plan/createPlan/ICreatePlanUseCase";
import IDeletePlanUseCase from "@useCases/plan/deletePlan/IDeletePlanUseCase";
import IFindPlanByIdUseCase from "@useCases/plan/findById/IFindPlanByIdUseCase";
import IFindPlanUseCase from "@useCases/plan/listPlan/IFindPlanUseCase";
import IUpdatePlanUseCase from "@useCases/plan/updatePlan/IUpdatePlanUseCase";
import express from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, queryParam, requestBody, requestParam, response } from "inversify-express-utils";
import { PlanDTO } from "../dto/PlanDTO";

@controller("/plan")
export default class PlanController {
    constructor(
        @inject(TYPES.createPlanUseCase)
        private readonly createPlanUseCase: ICreatePlanUseCase,
        @inject(TYPES.findPlanUseCase)
        private readonly findPlanUseCase: IFindPlanUseCase,
        @inject(TYPES.statusPlanUseCase)
        private readonly statusPlanUse: IStatusPlanUseCase,
        @inject(TYPES.updatePlanUseCase)
        private readonly updatePlanUseCase: IUpdatePlanUseCase,
        @inject(TYPES.findPlanByIdUseCase)
        private readonly findPlanByIdUseCase: IFindPlanByIdUseCase,
        @inject(TYPES.deletePlanUseCase)
        private readonly deletePlanUseCase: IDeletePlanUseCase
    ) {

    }

    @httpGet("/")
    public async listPlans(
        @response() res: express.Response,
        @queryParam("page") page: number,
        @queryParam("limit") limit: number
    ) {
        try {
            const plans = await this.findPlanUseCase.execute(page, limit);
            return res.status(200).send(plans)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpPost("/")
    public async createPlans(
        @response() res: express.Response,
        @requestBody() planDTO: PlanDTO
    ) {
        try {
            const planResponse = await this.createPlanUseCase.execute(planDTO);
            return res.status(200).send(planResponse)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpPut("/:id")
    public async updatePlans(
        @response() res: express.Response,
        @requestBody() planDTO: PlanDTO,
        @requestParam("id") id: number
    ) {
        try {
            const updatePlan = await this.updatePlanUseCase.execute(planDTO, +id);
            return res.json(updatePlan);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpGet("/change-plan-status/:id/:status")
    public async disablePlan(
        @response() res: express.Response,
        @requestParam("id") id: number,
        @requestParam("status") status: StatusEnum,
    ) {
        try {
            const plan = await this.statusPlanUse.execute(+id, status);
            return res.json(plan);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpGet("/:id")
    public async getPlanById(
        @response() res: express.Response,
        @requestParam("id") id: number
    ) {
        try {
            const planById = await this.findPlanByIdUseCase.execute(id);
            return res.json(planById);
        } catch (error) {
            return error;
        }
    }

    @httpDelete("/:id")
    public async delete(
        @response() res: express.Response,
        @requestParam("id") id: number
    ) {
        try {
            await this.deletePlanUseCase.execute(id);
            return res.json({ message: "Plano desabilitado com sucesso!" })
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }
}