import AppError from '@errors/AppError';
import { Organization } from '@models/Organization';
import { User } from '@models/User';
import IMailProvider from '@providers/mail/IMailProvider';
import Mail from '@providers/mail/Mail';
import MailFactory from '@providers/mail/MailFactory';
import IUserRepository from '@repositories/user/IUserRepository';
import TYPES from '@types';
import TokenUtil from '@util/TokenUtil';
import Validators from '@util/Validators';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import ICreateUserOrganizationUseCase from './ICreateUserOrganizationUseCase';

@injectable()
class CreateUserOrganizationUseCase implements ICreateUserOrganizationUseCase {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository,
        @inject(TYPES.nodemailerProvider)
        private readonly mailProvider: IMailProvider,
        @inject(TYPES.validators)
        private readonly validators: Validators,
        @inject(TYPES.tokenUtil)
        private readonly tokenUtil: TokenUtil,
        @inject(TYPES.mailFactory)
        private readonly mailFactory: MailFactory
    ) {
    }

    public async execute(user: User, organization: Organization): Promise<User> {

        this.verifyEmailValid(user.email);

        await this.verifyUserEmailAlreadyExist(user.email);

        await this.verifyCPFAlreadyExists(user.cpf);

        this.verifyPassowordValid(user.password);

        const passwordHashed = await hash(user.password, 8);

        user.password = passwordHashed;

        const result = await this.userRepository.save(user);

        this.sendMailAuthenticateUser(result);

        return result.right();
    }


    private verifyEmailValid(email: string) {
        const validateEmail = this.validators.verifyEmail(email);

        if (!validateEmail.valid) {
            throw new AppError({
                title: "E-mail inválido",
                message: validateEmail.response,
                statusCode: 400 //todo revisar
            });
        }
    }

    private async verifyCPFAlreadyExists(cpf:string){
        const validateCPF = await this.userRepository.findByCpf(cpf);

        if(validateCPF.right()){
            throw new AppError({
                title: "CPF já existe",
                message: 'Este CPF já está sendo usado por um usuário.',
                statusCode: 400 //todo revisar
            })
        }
    }


    private async verifyUserEmailAlreadyExist(email: string) {
        const checkUserEmailExist = await this.userRepository.findByEmail(email);

        if (checkUserEmailExist) {
            throw new AppError({
                title: "E-mail já existe",
                message: 'Este e-mail já está sendo usado por um usuário.',
                statusCode: 400 //todo revisar
            });
        }
    }

    private verifyPassowordValid(password: string) {
        const validatePassword = this.validators.verifyPassword(password);

        if (!validatePassword.valid) {
            throw new AppError({
                title: "Senha insegura",
                message: validatePassword.response,
                statusCode: 400 //todo revisar
            });
        }
    }

    private async sendMailAuthenticateUser(user: any) {
        const tokenEmail = await this.tokenUtil.generateToken({ id: user.id, email: user.email, name: user.name });

        const mail: Mail = this.mailFactory.factoryRegisterMail(user.name, user.email, tokenEmail);

        this.mailProvider.send(mail);
    }

}

export default CreateUserOrganizationUseCase;