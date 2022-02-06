import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Address } from "@models/Address";
import Mail from '@providers/mail/Mail';
import { User } from "@models/User";
import IMailProvider from "@providers/mail/IMailProvider";
import MailFactory from "@providers/mail/MailFactory";
import IAdrressRepository from "@repositories/address/IAddressRepository";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import TokenUtil from "@util/TokenUtil";
import Validators from "@util/Validators";
import { hash } from "bcryptjs";
import { inject, injectable } from "inversify";
import { StatusEnum } from "@models/UserStatusEnum";
import UserDTO from "src/main/dto/UserDTO";
import ICreateUserUseCase from "./ICreateUserUseCase";
import { AlarmMessage, AlarmMessageTransport } from "@providers/kafka/alarm/AlarmMessageTransport";
import IOrganizationRepository from "@repositories/organization/IOrganizationRepository";
import { Organization } from "@models/Organization";

@injectable()
class CreateUserUseCase implements ICreateUserUseCase {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository,
        @inject(TYPES.addressRepository)
        private readonly addressRepository: IAdrressRepository,
        @inject(TYPES.nodemailerProvider)
        private readonly mailProvider: IMailProvider,
        @inject(TYPES.tokenUtil)
        private readonly tokenUtil: TokenUtil,
        @inject(TYPES.mailFactory)
        private readonly mailFactory: MailFactory,
        @inject(TYPES.validators)
        private readonly validators: Validators,
        @inject(TYPES.AlarmMessageTransport)
        private readonly alarmMessageTransport: AlarmMessageTransport,
        @inject(TYPES.organizationRepository)
        private readonly organizationRepository: IOrganizationRepository,
    ) {

    }

    public async execute(userDTO: UserDTO): Promise<User> {
        let user: User = new User();
        user.name = userDTO.name;
        user.cpf = userDTO.cpf;
        user.registration = userDTO.registration;
        user.cellPhone = userDTO.cellPhone;
        user.email = userDTO.email;
        user.userType = userDTO.userType;
        user.organization = userDTO.organization;

        let address: Address = new Address();
        address.streetName = userDTO.address.streetName;
        address.complement = userDTO.address.complement;
        address.numberAddress = userDTO.address.numberAddress;
        address.zipCode = userDTO.address.zipCode;
        user.address = address;

        if (userDTO.status === StatusEnum.Habilitado) {
            user.active = true;
            user.blocked = false;
        } else if (userDTO.status === StatusEnum.Desabilitado) {
            user.active = false;
            user.blocked = false;
        } else if (userDTO.status === StatusEnum.Bloqueado) {
            user.active = false;
            user.blocked = true;
        }

        let userResult: Either<Failure, User> = await this.userRepository.findByEmailOrLogin(user);
        let userFindCpf: Either<Failure, User> = await this.userRepository.findByCpf(user.cpf);

        if (user.organization) {
            let findOrganizationByName: Either<Failure, Organization> = await this.organizationRepository.findByName(userDTO.organization.name)
            let organizationDB = findOrganizationByName.right();
            user.organization = organizationDB;
        }


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


        let password = this.generatePassword(6);
        let passwordEmail = password;
        user.password = await hash(password, 8);
        user.firstAcess = true;
        user.temporaryPassword = true;

        let addressUserSaveDB: Address = await this.addressRepository.save(user.address);
        user.address = addressUserSaveDB;

        let resultSaveUser: Either<Failure, User> = await this.userRepository.save(user);

        if (resultSaveUser.isLeft()) {
            throw resultSaveUser.left();
        }

        let userSaved: User = resultSaveUser.right();

        this.sendMailAuthenticateUser(userSaved, passwordEmail);
        // let alarmMessage = new AlarmMessage({
        //     name: "Cadastro de um novo usuário",
        //     level: "info",
        //     category: "Usuário",
        //     origin: "auth-server",
        //     description: `O usuário nome foi cadastrado`,
        // });
        // await this.alarmMessageTransport.sendAlarm(alarmMessage);

        return userSaved;
    }

    async sendMailAuthenticateUser(userDTO: any, passwordEmail: any) {
        const tokenNewUser = await this.tokenUtil.generateToken({ id: userDTO.id, email: userDTO.email, name: userDTO.name });
        const mail: Mail = this.mailFactory.factoryRegisterMail(userDTO, passwordEmail, tokenNewUser);
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

export default CreateUserUseCase;