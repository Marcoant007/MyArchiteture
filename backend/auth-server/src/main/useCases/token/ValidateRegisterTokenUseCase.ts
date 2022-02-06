import Config from '@config/Config';
import Either from '@config/Either';
import AppError from '@errors/AppError';
import { Failure } from '@errors/Failure';
import { User } from '@models/User';
import IUserRepository from '@repositories/user/IUserRepository';
import TYPES from '@types';

import { inject, injectable } from 'inversify';
import { verify } from 'jsonwebtoken';
import CreateUserDTO from 'src/main/dto/CreateUserDTO';
import LoginDTO from 'src/main/dto/LoginDTO';   
import ResetPasswordUserDTO from 'src/main/dto/ResetPasswordUserDTO';
import IValidateRegisterTokenUseCase from './IValidateRegisterTokenUseCase';




@injectable()
class ValidadeRegisterTokenUseCase implements IValidateRegisterTokenUseCase {
    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository
    ) { }

    public async execute({ token }: ResetPasswordUserDTO) {
        const { id, email }: any = verify(token, Config.tokenEmail.secret)
        const resultFindUser: Either<Failure, User> = await this.userRepository.findByIdAndEmail(id, email);

        if (resultFindUser.isLeft()) {
            throw Failure.tokenValidateError
        }

        if (!resultFindUser.right()) {
            throw Failure.tokenExpiredError
        }

        let userDb = resultFindUser.right()
        
        await this.userRepository.update(userDb);
        const userUpdatedResult : Either<Failure, User> = await this.userRepository.findById(userDb.id)
        const userDB = userUpdatedResult.right()
        return new LoginDTO(userDB)
    }

}


export default ValidadeRegisterTokenUseCase