import { Failure } from "@errors/Failure";
import { User } from "@models/User";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IFindUserByIdUseCase from "./IFindUserByIdUseCase";

@injectable()
class FindUserByIdUseCase implements IFindUserByIdUseCase {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository) {
    }

    public async execute(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        const userDB = user.right()

        if (!userDB) {
            throw Failure.userNotExists;
        }
        return userDB
    }
}

export default FindUserByIdUseCase