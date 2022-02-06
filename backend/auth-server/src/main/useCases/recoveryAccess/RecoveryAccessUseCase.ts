import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import RecoveryAccess from "@models/RecoveryAccess";
import { User } from "@models/User";
import IMailProvider from "@providers/mail/IMailProvider";
import Mail from "@providers/mail/Mail";
import MailFactory from "@providers/mail/MailFactory";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import TokenUtil from "@util/TokenUtil";
import { inject, injectable } from "inversify";
import IRecoveryAccess from "./IRecoveryAccessUseCase";


@injectable()
class RecoveryAccessUseCase implements IRecoveryAccess {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository,
        @inject(TYPES.tokenUtil)
        private readonly tokenUtil: TokenUtil,
        @inject(TYPES.mailFactory)
        private readonly mailFactory: MailFactory,
        @inject(TYPES.nodemailerProvider)
        private readonly mailProvider: IMailProvider
    ) {
    }


    async execute(recovery: RecoveryAccess): Promise<object> {

        let cpfOrCode: string = recovery.cpfOrCode;
        let email: string = recovery.email;

        if (!email && !cpfOrCode) {
            throw Failure.emailOrCodeEmpty;
        }

        if (email) {
            await this.emailOptionRecovery(email);
        }

        if (cpfOrCode) {
            await this.cpfOrCodeRecovery(cpfOrCode);
        }

        return { message: "Email de recuperação, enviado com sucesso!", code: 200 }
    }

    private async emailOptionRecovery(email: string) {
        let hasEmail: Either<Failure, User>
            = await this.userRepository.findByEmail(email);

        if (!hasEmail.right()) {
            throw Failure.userEmailNotExists;
        }

        let userDB: User = hasEmail.right();

        this.sendEmail(userDB);

    }
    private async cpfOrCodeRecovery(cpfOrCode: string) {
        let hasCpfOrCode: Either<Failure, User>
            = await this.userRepository.findByCpfOrCode(cpfOrCode);

        if (!hasCpfOrCode.right()) {
            throw Failure.userCpfOrCodeNoteExists;
        }

        let userDB: User = hasCpfOrCode.right();

        this.sendEmail(userDB);
    }

    private async sendEmail(user: User) {

        const tokenEmail = await this.tokenUtil.generateToken({ id: user.id, email: user.email, name: user.name });

        const mail: Mail = this.mailFactory.factoryRecoverPasswordMail(user, tokenEmail);

        this.mailProvider.send(mail);
    }

}

export default RecoveryAccessUseCase;
