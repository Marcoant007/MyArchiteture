import RecoveryAccess from "@models/RecoveryAccess";
import TYPES from "@types";
import IRecoveryAccess from "@useCases/recoveryAccess/IRecoveryAccessUseCase";
import IGenerateTokenUseCase from "@useCases/token/IGenerateTokenUseCase";
import IRecoverUserEmailUseCase from "@useCases/recoveryAccess/IRecoverUserEmailUseCase";
import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpPost,
    requestBody,
    response
} from "inversify-express-utils";
import RecoverUserEmailDTO from "../dto/RecoverUserEmailDTO";
import AppError from "@errors/AppError";



@controller("/retrieveaccess")
export default class RetriveAcessController {

    constructor(
        @inject(TYPES.recoverUserEmailUseCase)
        private readonly recoverUserEmailUseCase: IRecoverUserEmailUseCase,

        @inject(TYPES.generateTokenUseCase)
        private readonly generateTokenUseCase: IGenerateTokenUseCase,

        @inject(TYPES.recoveryAccess)
        private readonly recoveryAccessUseCase: IRecoveryAccess
    ) {
    }

    @httpPost("/recover")
    public async retriveAcess(
        @response() res: express.Response,
        @requestBody() recoverUserEmail: RecoverUserEmailDTO) {
        try {
            let recoverUser = await this.recoverUserEmailUseCase.execute(recoverUserEmail)
            const refactory = recoverUser.email.split('@');

            if (refactory.length !== 2) {
                throw new AppError(
                    {
                        title: "Email Inválido",
                        message: "Email em formato inválido"
                    });
            }
            const firstPositionString = refactory[0].substring(0, 2);
            const secondPositionString = refactory[1];
            const resultUser = `${firstPositionString}***${secondPositionString}`;

            res.status(200).json(resultUser)
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }

    @httpPost("/recoveryAccess")
    public async recoveryAccess(
        @response() res: express.Response,
        @requestBody() recoveryData: RecoveryAccess) {

        try {
            let recovery: RecoveryAccess = new RecoveryAccess();

            recovery.cpfOrCode = recoveryData.cpfOrCode;
            recovery.email = recoveryData.email;

            let recoveryStatus = await this.recoveryAccessUseCase.execute(recovery);

            res.status(200).json(recoveryStatus);
        } catch (error) {
            res.status(error.statusCode).json(error);
        }

    }



}
