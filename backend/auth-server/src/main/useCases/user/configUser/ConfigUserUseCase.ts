import { Failure } from "@errors/Failure";
import { User } from "@models/User";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import UserDTO from "src/main/dto/UserDTO";
import { hash } from 'bcryptjs';
import IConfigUserUseCase from "./IConfigUserUseCase";

@injectable()
export default class ConfigUserUseCase implements IConfigUserUseCase {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository
    ) { }

    async execute(userDTO: UserDTO, id: number): Promise<User> {

        let userDB = await this.findUserById(id);
        userDB = await this.updateFields(userDB, userDTO);

        await this.userRepository.update(userDB);

        return userDB
    }

    private async findUserById(id: number): Promise<User> {
        const currentUser = await this.userRepository.findById(id);

        if (!currentUser) {
            throw Failure.userNotExists;
        }

        return currentUser.right();
    }

    private async updateFields(userDb: User, userDTO: UserDTO) {
        userDb.name = userDTO.name;
        userDb.userType = userDTO.userType;
        userDb.email = userDTO.email;

        if (userDTO.isNewPassword) {
            let password = userDTO.password;
            await this.validatePassword(password);
            userDb.password = await hash(password, 8);
        }

        return userDb;
    }

    private async validatePassword(password: string) {

        if (!(/"((?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[\W]).{8,64})/g.test(password))) {

            if (password.length < 8) {
                throw Failure.passwordValidateMinEightError;
            }

            if (!(/^(?=.*[A-Z])/.test(password))) {
                throw Failure.passwordValidateBigLetterError;
            }

            if (!(/(?=.*[a-z])/.test(password))) {
                throw Failure.passwordValidateSmallLetterError;
            }

            if (!(/^(?=.*[\d])/.test(password))) {
                throw Failure.passwordValidateMinNumberError;
            }

            if (!(/[^A-z\s\d][\\\^]?/.test(password))) {
                throw Failure.passwordValidateMinSpecialError;
            }
        }
    }
}