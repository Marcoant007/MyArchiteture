import { StatusEnum } from "@models/UserStatusEnum";
import TYPES from "@types";
import IStatusCourseUseCase from "@useCases/course/changeStatusCourse/IStatusCourseUseCase";
import ICreateCourseUseCase from "@useCases/course/createCourse/ICreateCourseUseCase";
import IDeleteCourseUseCase from "@useCases/course/deleteCourse/IDeleteCourseUseCase";
import IFindAllCourseUseCase from "@useCases/course/findAllCourses/IFindAllCourseUseCase";
import IFindCourseById from "@useCases/course/findCourseById/IFindCourseById";
import IUpdateCourseUseCase from "@useCases/course/updateCourse/IUpdateCourseUseCase";
import express from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, queryParam, requestBody, requestParam, response, TYPE } from "inversify-express-utils";
import CourseDTO from "../dto/CourseDTO";

@controller("/courses")
export default class CourseController {
    constructor(
        @inject(TYPES.createCourseUseCase)
        private readonly createCourseUseCase: ICreateCourseUseCase,
        @inject(TYPES.findAllCourseUseCase)
        private readonly findAllCourseUseCase: IFindAllCourseUseCase,
        @inject(TYPES.updateCourseUseCase)
        private readonly updateCourseUseCase: IUpdateCourseUseCase,
        @inject(TYPES.statusCourseUseCase)
        private readonly statusCourseUseCase: IStatusCourseUseCase,
        @inject(TYPES.deleteCourseUseCase)
        private readonly deleteCourseUseCase: IDeleteCourseUseCase,
        @inject(TYPES.findCourseById)
        private readonly findCourseByID: IFindCourseById
    ) { }


    @httpPost("")
    public async createCourse(
        @response() response: express.Response,
        @requestBody() courseDTO: CourseDTO
    ) {
        try {
            const courseUseCase = await this.createCourseUseCase.execute(courseDTO);
            return response.status(200).json(courseUseCase);
        } catch (error) {
            response.status(error.statusCode).send(error);
        }
    }

    @httpGet("")
    public async findAllCourse(
        @response() response: express.Response,
        @queryParam("page") page: number,
        @queryParam("limit") limit: number,
        @queryParam("name") name: string,
    ) {
        try {
            const courseUseCase = await this.findAllCourseUseCase.execute(page, limit, name);
            return response.json(courseUseCase);
        } catch (error) {
            response.status(error.status).send(error);
        }
    }

    @httpPut("/:id")
    public async updateCourse(
        @response() response: express.Response,
        @requestBody() courseDTO: CourseDTO,
        @requestParam("id") id: number
    ) {
        try {
            const updatedCourse = await this.updateCourseUseCase.execute(courseDTO, id);
            return response.json(updatedCourse)
        } catch (error) {
            response.status(error.status).send(error);
        }
    }

    @httpGet("/change-status/:id/:status")
    public async changeStatus(
        @response() response: express.Response,
        @requestParam("id") id: number,
        @requestParam("status") status: StatusEnum
    ){  
        try {
            const course = await this.statusCourseUseCase.execute(+id, status);
            return response.json(course);
        } catch (error) {
            response.status(error.statusCode).send(error);
        }
    }

    @httpDelete("/:id")
    public async delete(
        @response() response: express.Response,
        @requestParam("id") id: number,
    ){
        try {
            const course = await this.deleteCourseUseCase.execute(+id);
            return response.json(course)
        } catch (error) {
            response.status(error.statusCode).send(error)
        }
    }

    @httpGet("/:id")
    public async findCourseById(
        @response() response: express.Response,
        @requestParam("id") id: number,
    ){
        try {
            const course = await this.findCourseByID.execute(+id)
            return response.json(course)
        } catch (error) {
            response.status(error.statusCode).send(error)
        }
    }

}