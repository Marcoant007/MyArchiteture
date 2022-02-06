import Either from '@config/Either';
import { Failure } from '@errors/Failure';
import { Organization } from '@models/Organization';
import { StatusOrganization } from '@models/StatusOrganization';
import { User } from '@models/User';
import { UserTypeEnum } from '@models/UserTypeEnum';
import IMailProvider from '@providers/mail/IMailProvider';
import Mail from '@providers/mail/Mail';
import MailFactory from '@providers/mail/MailFactory';
import IAdrressRepository from '@repositories/address/IAddressRepository';
import OrganizationRepository from '@repositories/organization/OrganizationRepository';
import StatusOrganizationRepository from '@repositories/statusOrganization/StatusOrganizationRepository';
import IUserRepository from '@repositories/user/IUserRepository';
import TYPES from '@types';
import TokenUtil from '@util/TokenUtil';
import Validators from '@util/Validators';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import InstituitionUserAdminDTO from 'src/main/dto/InstituitionUserAdminDTO';
import IRegisterInstituitionAndAdminUseCase from './IRegisterInstituitionAndAdminUseCase';

@injectable()
class RegisterInstituitionAndAdminUseCase implements IRegisterInstituitionAndAdminUseCase {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository,
        @inject(TYPES.nodemailerProvider)
        private readonly mailProvider: IMailProvider,
        @inject(TYPES.validators)
        private readonly validators: Validators,
        @inject(TYPES.addressRepository)
        private readonly addressRepository: IAdrressRepository,
        @inject(TYPES.tokenUtil)
        private readonly tokenUtil: TokenUtil,
        @inject(TYPES.mailFactory)
        private readonly mailFactory: MailFactory,
        @inject(TYPES.organizationRepository)
        private readonly organizationRepository: OrganizationRepository,
        @inject(TYPES.statusOrganizationRepository)
        private readonly statusOrganizationRepository: StatusOrganizationRepository
    ) {
    }

    public async execute(instituitionUserAdminDTO: InstituitionUserAdminDTO): Promise<any> {
        let userDB: User = new User();
        userDB.name = instituitionUserAdminDTO.name;
        userDB.email = instituitionUserAdminDTO.email;
        userDB.cpf = instituitionUserAdminDTO.cpf;
        userDB.userType = instituitionUserAdminDTO.userType;
        userDB.registration = instituitionUserAdminDTO.registration

        let organization: Organization = new Organization();
        organization.name = instituitionUserAdminDTO.nameEducationalInstitution;

        let resultFindOrganization: Either<Failure, Organization | undefined>
            = await this.organizationRepository.findByName(organization.name);

        let organizationExist = resultFindOrganization.right();

        if (organizationExist) {
            throw Failure.organizationAlreadyExists
        }

        let userResult: Either<Failure, User> = await this.userRepository.findByEmailOrLogin(userDB);
        let userFindCpf: Either<Failure, User> = await this.userRepository.findByCpf(userDB.cpf)
        let userEmailAlreadyExists = userResult.right();
        let userCpfAlreadyExists = userFindCpf.right();

        if (userEmailAlreadyExists) {
            throw Failure.userEmailAlreadyExists;
        }

        if (userCpfAlreadyExists) {
            throw Failure.userCpfAlreadyExists;
        }

        if (userResult.isLeft()) {
            throw userResult.left();
        }

        let statusResult: Either<Failure, StatusOrganization>
            = await this.statusOrganizationRepository.findStatus("Ativo");

        if (statusResult.isLeft()) {
            throw statusResult.left();
        }

        organization.statusOrganization = statusResult.right();

        organization.active = true;
        let organizationSaveDB: Organization = await this.organizationRepository.saveOrganization(organization);
        userDB.organization = organizationSaveDB;

        userDB.active = true;
        userDB.blocked = false;
        let password = this.generatePassword(6);
        let passwordEmail = password;
        userDB.password = await hash(password, 8);
        userDB.firstAcess = true
        userDB.temporaryPassword = true;


        let resultSaveUser: Either<Failure, User> = await this.userRepository.save(userDB);

        if (resultSaveUser.isLeft()) {
            throw resultSaveUser.left();
        }

        let userSaved: User = resultSaveUser.right();
        this.sendMailAuthenticateUser(userSaved, passwordEmail)

    }

    async sendMailAuthenticateUser(userDTO: any, passwordEmail: any) {
        const tokenUserOrOrganization = await this.tokenUtil.generateToken({ id: userDTO.id, email: userDTO.email, name: userDTO.name });
        const mail: Mail = this.mailFactory.factoryRegisterMail(userDTO, passwordEmail, tokenUserOrOrganization);
        this.mailProvider.send(mail)
    }

    private generatePassword(lenght: number) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for (let i = 0; i < lenght; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export default RegisterInstituitionAndAdminUseCase;