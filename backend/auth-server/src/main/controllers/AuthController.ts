import Login from "@models/Login";
import RecoveryAccess from "@models/RecoveryAccess";
import { User } from "@models/User";
import TYPES from "@types";
import IRecoveryAccess from "@useCases/recoveryAccess/IRecoveryAccessUseCase";
import IGenerateTokenUseCase from "@useCases/token/IGenerateTokenUseCase";
import IRecoverUserEmailUseCase from "@useCases/recoveryAccess/IRecoverUserEmailUseCase";
import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    requestBody,
    requestParam,
    response,
    TYPE
} from "inversify-express-utils";
import RecoverUserEmailDTO from "../dto/RecoverUserEmailDTO";
import ILoginUseCase from "../useCases/login/ILoginUseCase";
import { request } from "http";
import IResetPasswordUseCase from "@useCases/recoveryAccess/IResetPasswordUseCase";
import NewPassword from "../dto/NewPasswordDTO";
import NewPasswordDTO from "../dto/NewPasswordDTO";
import IValidateRegisterTokenUseCase from "@useCases/token/IValidateRegisterTokenUseCase";
import IFindUserUseCase from "@useCases/user/findUser/IFindUserUseCase";

@controller("/auth")

export default class AuthController {

    constructor(
        @inject(TYPES.loginUseCase)
        private readonly loginUseCase: ILoginUseCase,

        @inject(TYPES.findUserUseCase)
        private readonly findUserUseCase: IFindUserUseCase,

        @inject(TYPES.resetPasswordUseCase)
        private readonly resetPasswordUseCase: IResetPasswordUseCase,

        @inject(TYPES.recoverUserEmailUseCase)
        private readonly recoverUserEmailUseCase: IRecoverUserEmailUseCase,

        @inject(TYPES.generateTokenUseCase)
        private readonly generateTokenUseCase: IGenerateTokenUseCase,

        @inject(TYPES.validateRegisterTokenUseCase)
        private readonly validateRegisterTokenUseCase: IValidateRegisterTokenUseCase,

    ) {
    }


    @httpPost("/login")
    public async login(
        @response() res: express.Response,
        @requestBody() login: Login) {
        try {
            let user: User = new User();
            user.name = login.username;
            user.email = login.email;
            user.password = login.password;

            let userDb = await this.loginUseCase.execute(user);

            let token = await this.generateTokenUseCase.execute(userDb);

            let response = {
                id: userDb.id,
                token: token,
                name: userDb.name,
                isFirstAcess: userDb.firstAcess,
                userType: userDb.userType,
                temporaryPassword: userDb.temporaryPassword,
                group: userDb.groups,
                permissions: userDb
            }
            
            res.send(response);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpGet("/validate/:token")
    public async validateToken(
        @response() res: express.Response,
        @requestParam() tokenAccess
    ) {
        try {
            let token = tokenAccess.token
            const validateRegisterToken = await this.validateRegisterTokenUseCase.execute({ token });
            console.log(validateRegisterToken)

            res.json(validateRegisterToken)
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    @httpPost("/resetpassword/:token")
    public async resetPassword(
        @response() res: express.Response,
        @requestBody() pass: NewPasswordDTO,
        @requestParam() tokenAccess) {
        try {
            let token = tokenAccess.token;
            await this.resetPasswordUseCase.execute(pass, token);
            res.json({ message: "Senha alterada com sucesso!" })
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }

    


}