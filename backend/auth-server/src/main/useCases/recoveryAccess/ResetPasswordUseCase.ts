import { Failure } from '@errors/Failure';
import { User } from '@models/User';
import IUserRepository from '@repositories/user/IUserRepository';
import TYPES from '@types';
import IValidateRegisterTokenUseCase from '@useCases/token/IValidateRegisterTokenUseCase';
import ValidadeRegisterTokenUseCase from '@useCases/token/ValidateRegisterTokenUseCase';
import { throws } from 'assert';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import NewPassword from 'src/main/dto/NewPasswordDTO';
import ResetPasswordUserDTO from 'src/main/dto/ResetPasswordUserDTO';
import IResetPasswordUseCase from './IResetPasswordUseCase';
import TokenUtil from "@util/TokenUtil";
import MailFactory from '@providers/mail/MailFactory';
import IMailProvider from '@providers/mail/IMailProvider';
import Mail from '@providers/mail/Mail';



@injectable()
class ResetPasswordUseCase implements IResetPasswordUseCase {
    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository,

        @inject(TYPES.validateRegisterTokenUseCase)
        private readonly validateRegisterTokenUseCase: IValidateRegisterTokenUseCase,
        @inject(TYPES.tokenUtil)
        private readonly tokenUtil: TokenUtil,
        @inject(TYPES.mailFactory)
        private readonly mailFactory: MailFactory,
        @inject(TYPES.nodemailerProvider)
        private readonly mailProvider: IMailProvider
    ) { }

    public async execute(credentials: NewPassword, token: string): Promise<string> {

        let password = credentials.password;

        await this.validatePassword(password);

        await this.verifyPassword(credentials);

        let tokenUser = await this.validateToken(token);

        const passwordHashed = await hash(password, 8);
        const user = await this.userRepository.findByEmail(tokenUser.email);
        let userDB = user.right();

        userDB.temporaryPassword = false;
        userDB.firstAcess = false;
        userDB.blocked = false;
        userDB.attempt = 0;

        await this.updateNewPassword(passwordHashed, userDB)
       
        this.sendEmail(userDB);
        return userDB.email;
    }

    private async validateToken(token: string) {
        return await this.validateRegisterTokenUseCase.execute({ token: token });
    }

    private async verifyPassword(credentials: NewPassword) {
        let password = credentials.password;
        let confirmPassword = credentials.confirmPassword;

        if (password !== confirmPassword) {
            throw Failure.passwordConfirmationError;
        }

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

    private async updateNewPassword(passwordHashed: string, userDB: User) {

        let userUpdate = userDB;
        userUpdate.password = passwordHashed;
        userUpdate.blocked = false
        userUpdate.attempt = 0;

        await this.userRepository.update(userUpdate);

    }

    private async sendEmail(user: User) {

        const tokenEmail = await this.tokenUtil.generateToken({ id: user.id, email: user.email, name: user.name });

        const mail: Mail = this.mailFactory.factoryConfirmPasswordMail(user, tokenEmail);

        this.mailProvider.send(mail);
    }

}
export default ResetPasswordUseCase
