import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import UserDTO from "src/main/dto/UserDTO";
import IFindUsersByOrganization from "./IFindUsersByOrganizationUseCase";

@injectable()
class FindUsersByOrganizationUseCase implements IFindUsersByOrganization {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository
    ) { }

    public async execute(configPagination: any): Promise<{ users: UserDTO[], count: number }> {
        const { page, limit, name, userType, idOrganization } = configPagination;
        const pagination = new Pagination(limit, page);
        this.userRepository.setPagination(pagination);

        const resultDb = await this.userRepository.findUsersByOrganization(idOrganization, name, userType);
        const { userDb, count } = resultDb.right();

        if (resultDb.isLeft()) {
            throw Failure.userErrorFindByOrganization;
        }

        const users = userDb.map(user => new UserDTO(user));
        const response = { users, count }


        return response;
    }
}

export default FindUsersByOrganizationUseCase