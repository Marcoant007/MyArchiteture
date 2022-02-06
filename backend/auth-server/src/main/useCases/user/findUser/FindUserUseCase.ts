import { Pagination } from "@database/Pagination";
import { User } from "@models/User";
import IUserRepository from "@repositories/user/IUserRepository";
import UserRepository from "@repositories/user/UserRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import UserDTO from "src/main/dto/UserDTO";
import IFindUserUseCase from "./IFindUserUseCase";

@injectable()
class FindUserUseCase implements IFindUserUseCase {
    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository) {
    }

    public async execute(page, limit, name, userType): Promise< {users:UserDTO[], count:number} > {

        const pagination = new Pagination(limit, page);
        this.userRepository.setPagination(pagination);
        const user = await this.userRepository.find(name, userType);
        const {userDb,count} = user.right();
        const users =  userDb.map(user => new UserDTO(user))
        const response = {users,count}
        return response
    }
}

export default FindUserUseCase