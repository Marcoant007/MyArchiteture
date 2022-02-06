import { User } from "@models/User";
import TYPES from "@types";
import TokenUtil from "@util/TokenUtil";
import { inject, injectable } from "inversify";
import UserDTO from "src/main/dto/UserDTO";
import IGenerateTokenUseCase from "./IGenerateTokenUseCase";

@injectable()
export default class GenerateTokenUseCase implements IGenerateTokenUseCase {

    constructor(
        @inject(TYPES.tokenUtil)
        private readonly tokenUtil: TokenUtil
    ) {

    }

    //TODO obrigar que o usuário esteja autenticado
    async execute(user: UserDTO): Promise<string> {
        
        // Perfil do usuário

        let name = user.name;
        let email = user.email;
        let id = user.id;
        let permission = user.permissions;

        const token = await this.tokenUtil.generateToken({
            name,
            email,
            id,
            permission
        });

        return token;
    }

}
