import { Failure } from "@errors/Failure";
import { Address } from "@models/Address";
import { User } from "@models/User";
import { StatusEnum } from "@models/UserStatusEnum";
import IAdrressRepository from "@repositories/address/IAddressRepository";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import UserDTO from "src/main/dto/UserDTO";
import IUpdatedUserUseCase from "./IUpdatedUserUseCase";


@injectable()
class UpdatedUserUseCase implements IUpdatedUserUseCase {

    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository,

        @inject(TYPES.addressRepository)
        private readonly addressRepository: IAdrressRepository,
    ) {
    }

    public async execute(userDTO: UserDTO, id: number) {
        const userDB = await this.findUserById(id);
        const userDBEmail = await this.findUserByEmail(userDTO.email);
        const userDBCpf = await this.findUserByCPF(userDTO.cpf);

        if (userDBEmail) {
            if (userDBEmail.id != userDB.id) {
                throw Failure.userEmailAlreadyExists
            }
        }

        if(userDBCpf){
            if (userDBCpf.id != userDB.id) {
                throw Failure.userCpfAlreadyExists
            }
        }

        if (!userDTO.address) {
            throw Failure.userMandatoryAddress;
        }
        this.updateUserFields(userDB, userDTO);
        await this.addressRepository.save(userDB.address);
        await this.userRepository.update(userDB);

        return userDB;

    }

    public updateUserFields(userDB: User, userDTO: UserDTO) {
        userDB.name = userDTO.name;
        userDB.email = userDTO.email;
        userDB.cpf = userDTO.cpf;
        userDB.userType = userDTO.userType;
        userDB.registration = userDTO.registration;
        userDB.cellPhone = userDTO.cellPhone;
        userDB.updatedAt = new Date();

        if (!userDB.address) {
            let address: Address = new Address();
            userDB.address = address;
        }

        userDB.address.updatedAt = new Date();
        userDB.address.streetName = userDTO.address.streetName;
        userDB.address.complement = userDTO.address.complement;
        userDB.address.numberAddress = userDTO.address.numberAddress;
        userDB.address.zipCode = userDTO.address.zipCode;

        if (userDTO.status === StatusEnum.Habilitado) {
            userDB.active = true;
            userDB.blocked = false;
        } else if (userDTO.status === StatusEnum.Desabilitado) {
            userDB.active = false;
            userDB.blocked = false;
        } else if (userDTO.status === StatusEnum.Bloqueado) {
            userDB.active = false;
            userDB.blocked = true;
        }
    }

    public async findUserById(id: number): Promise<User> {
        const userById = await this.userRepository.findById(id);

        if (!userById.right()) {
            throw Failure.userNotExists;
        }

        return userById.right();
    }

    public async findUserByAddressId(id: number): Promise<Address> {
        const userByAddress = await this.addressRepository.findById(id);

        if (!userByAddress.right()) {
            throw Failure.userNotExists;
        }

        return userByAddress.right();
    }

    public async findUserByEmail(email: string): Promise<User> {
        const userEmail = await this.userRepository.findByEmail(email);

        if (!userEmail.right()) {
            return
        }

        return userEmail.right();
    }

    public async findUserByCPF(cpf: string): Promise<User> {
        const userCPF = await this.userRepository.findByCpf(cpf);

        if (!userCPF.right()) {
            return
        }

        return userCPF.right();
    }
}

export default UpdatedUserUseCase