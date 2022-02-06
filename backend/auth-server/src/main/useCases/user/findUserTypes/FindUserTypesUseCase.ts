import { UserTypeEnum } from "@models/UserTypeEnum";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IFindUserTypesUseCase from "./IFindUserTypesUseCase";


@injectable()

class FindUserTypesUseCase implements IFindUserTypesUseCase {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository) {
    }

    public async execute(): Promise<UserTypeEnum[]>{
        const user = await this.userRepository.findUserTypes()
        return user.right();
    }

}


export default FindUserTypesUseCase