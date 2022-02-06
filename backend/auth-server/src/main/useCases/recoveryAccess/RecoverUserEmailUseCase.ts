import AppError from '@errors/AppError';
import { Failure } from '@errors/Failure';
import { User } from '@models/User';
import IUserRepository from '@repositories/user/IUserRepository';
import TYPES from '@types';
import { inject, injectable } from 'inversify';
import RecoverUserEmailDTO from 'src/main/dto/RecoverUserEmailDTO';
import IRecoverUserEmailUseCase from './IRecoverUserEmailUseCase';

@injectable()
class RecoverUserEmailUseCase implements IRecoverUserEmailUseCase {
    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository
    ) {
    }

    public async execute(recoverUserEmail: RecoverUserEmailDTO): Promise<User> {

        const resultFindByCpf = await this.userRepository.findByCpf(recoverUserEmail.cpf);
        const resultFindByRegistration = await this.userRepository.findUserByRegistration(recoverUserEmail.registration);

        if (resultFindByCpf.isLeft() && resultFindByRegistration.isLeft()) {
            throw Failure.userEmailAlreadyExists;
        }

        if (!resultFindByCpf.right() && !resultFindByRegistration.right()) {
            throw Failure.userCpfOrCodeNoteExists;
        }

        if (resultFindByCpf.right()) {
            return resultFindByCpf.right();
        }

        if (resultFindByRegistration.right()) {
            return resultFindByRegistration.right();
        }

    }
}

export default RecoverUserEmailUseCase