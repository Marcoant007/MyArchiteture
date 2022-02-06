import { Failure } from "@errors/Failure";
import UserRepository from "@repositories/user/UserRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export async function setInfoRequest(request: Request, response: Response, next: NextFunction) {
    try {
        const userType = request.headers.usertype;
        request.userType = userType ? <string>userType : '';
        return next();
    } catch (error) {
        throw Failure.tokenValidateError
    }
}