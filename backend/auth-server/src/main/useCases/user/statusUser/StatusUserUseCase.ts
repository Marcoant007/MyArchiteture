import { Failure } from "@errors/Failure";
import { User } from "@models/User";
import { StatusEnum } from "@models/UserStatusEnum";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IStatusUserUseCase from "./IStatusUserUseCase";

@injectable()
class StatusUserUseCase implements IStatusUserUseCase {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository,
    ) { }

    public async execute(id: number, status: StatusEnum): Promise<User> {
        const user = await this.userRepository.findById(id)
        const userDB = user.right()

        if (!userDB) {
            throw Failure.userNotExists;
        }

        if (status === StatusEnum.Habilitado) {
            userDB.active = true;
            userDB.blocked = false;
        } else if (status === StatusEnum.Desabilitado) {
            userDB.active = false;
            userDB.blocked = false;
        } else if (status === StatusEnum.Bloqueado) {
            userDB.active = false;
            userDB.blocked = true;
        }

        await this.userRepository.update(userDB)
        const userResult = await this.userRepository.findById(id)
        return userResult.right()
    }
}

export default StatusUserUseCase