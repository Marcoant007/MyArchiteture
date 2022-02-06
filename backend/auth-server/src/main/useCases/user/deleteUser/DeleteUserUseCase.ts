import { Failure } from "@errors/Failure";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IDeleteUserUseCase from "./IDeleteUserUseCase";

@injectable()
class DeleteUserUseCase implements IDeleteUserUseCase {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository,
    ) { }

    public async execute(id: number) {
        const user = await this.userRepository.findById(id)
        const userDB = user.right()

        if (!userDB) {
            throw Failure.userNotExists;
        }

        userDB.deleted = true;

        await this.userRepository.update(userDB);
    }

}

export default DeleteUserUseCase