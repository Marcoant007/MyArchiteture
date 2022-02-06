import { inject, injectable } from "inversify";
import IImportUserUseCase from "./IImportUserUseCase";
import fs from "fs";
import csvParse from "csv-parse";
import IUserRepository from "@repositories/user/IUserRepository";
import TYPES from "@types";
import XLSX from "xlsx"
import { Address } from "@models/Address";
import { User } from "@models/User";
import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import UserDTO from "src/main/dto/UserDTO";
import { hash } from "bcryptjs";
import IOrganizationRepository from "@repositories/organization/IOrganizationRepository";
import { StatusEnum } from "@models/UserStatusEnum";
import IAdrressRepository from "@repositories/address/IAddressRepository";
import IMailProvider from "@providers/mail/IMailProvider";
import TokenUtil from "@util/TokenUtil";
import MailFactory from "@providers/mail/MailFactory";
import Mail from "@providers/mail/Mail";
import { ValidateUserDTO } from "src/main/dto/ValidateUsersDTO";
import IUserBuilder from "src/main/builders/IUserBuilder";



@injectable()
class ImportUserUseCase implements IImportUserUseCase {
    constructor(
        @inject(TYPES.userRepository)
        private readonly userRepository: IUserRepository,
        @inject(TYPES.organizationRepository)
        private readonly organizationRepository: IOrganizationRepository,
        @inject(TYPES.addressRepository)
        private readonly addressRepository: IAdrressRepository,
        @inject(TYPES.nodemailerProvider)
        private readonly mailProvider: IMailProvider,
        @inject(TYPES.tokenUtil)
        private readonly tokenUtil: TokenUtil,
        @inject(TYPES.mailFactory)
        private readonly mailFactory: MailFactory,
        @inject(TYPES.userBuilder)
        private readonly userBuilder: IUserBuilder,

    ) {
    }

    // imporUserUseCase
    // private readCSVFile(file): User[]
    // private readXSLFile(file): User[]
    // private readXLSXFile(file): User[]
    //                                                Errados, Certos
    // private validateUsers(users): UsesValidatesDTO<User[], User[]> | boolean; 

    // Vereficia usuário a usuário se todas as regas estão corretas e retorna um DTO com duas listas de usuário corretos a esquerda e inforretos a direita

    // private saveUsers(usersCorrets): boolean;
    // return usersErrors;

    public async execute(file: Express.Multer.File) {
        const csv = file.mimetype === "text/csv";
        const excel = file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const excelOld = file.mimetype === "application/vnd.ms-excel";

        let users;

        if (excel || excelOld) {
            users = await this.readXLSFiles(file);
        }

        if (csv) {
            users = await this.readCSVFiles(file);
        }

        const validateUserDTO: ValidateUserDTO = this.validateUsers(users);

        this.saveUsers(validateUserDTO.getRight());
    }

    public async readCSVFiles(file: Express.Multer.File): Promise<UserDTO[]> { // TODO esse código está muito feio
        const userList: UserDTO[] = [];
        let count = 0;
        return new Promise((resolve, reject) => {
           fs.createReadStream(file.path).pipe(csvParse())
               .on('data', async (users) => {
                   if(!users){
                       console.log("ERROR AO S")
                   }
                    try {
                        if (count === 0) {
                            this.userBuilder.configure(users);
                        } else {
                            userList.push(this.userBuilder.build(users)); // TODO falta tratar erros
                        }
                        count++;
                    } catch (error) {
                        console.log("ERRO: ", error)
                    }
                }).on('end', function () {
                    resolve(userList)
                })
        });

    }

    private validateUsers(users: UserDTO[]): ValidateUserDTO {
        
        let userList: UserDTO[] = [];
        let success : ValidateUserDTO;
        users.forEach(async data => {
            let user: UserDTO = new User();
            user.name = data.name;
            user.email = data.email;
            user.cpf = data.cpf;
            user.registration = data.registration;
            user.cellPhone = data.cellPhone;
            user.birthDate = data.birthDate;

            let address: Address = new Address();
            address.zipCode = data.zipCode;
            address.streetName = data.streetName;
            address.numberAddress = data.numberAddress;
            address.complement = data.complement;
            user.address = address;
            user.status = data.status;

            if (user.status === StatusEnum.Habilitado) {
                user.active = true;
                user.blocked = false;
            } else if (user.status === StatusEnum.Desabilitado) {
                user.active = false;
                user.blocked = false;
            } else if (user.status === StatusEnum.Bloqueado) {
                user.active = false;
                user.blocked = true;
            }

            userList.push(user);
            
        });
      return

    }

    private saveUsers(users: UserDTO[]) {

    }

    private async saveUserCVSFiles(file: Express.Multer.File) {
        //TODO esta salvando certo mas retona erro 
        let readCSV = await this.readCSVFiles(file);
        const user: UserDTO = new User();
        let userList: UserDTO[] = [];

        readCSV.forEach(async (data) => {
            let user: UserDTO = new User();
            user.name = data[0];
            user.email = data[1];
            user.cpf = data[2];
            user.registration = data[3];
            user.cellPhone = data[4];
            user.birthDate = data[5];

            let address: Address = new Address();
            address.zipCode = data[6];
            address.streetName = data[7];
            address.numberAddress = data[8];
            address.complement = data[9];
            user.address = address;
            user.status = data[10];


            if (user.status === StatusEnum.Habilitado) {
                user.active = true;
                user.blocked = false;
            } else if (user.status === StatusEnum.Desabilitado) {
                user.active = false;
                user.blocked = false;
            } else if (user.status === StatusEnum.Bloqueado) {
                user.active = false;
                user.blocked = true;
            }
            userList.push(user);

        })

        for (let i = 0; i <= userList.length; i++) {

            console.log(userList.length);
            let addressUserSaveDB: Address = await this.addressRepository.save(userList[i].address);

            userList[i].address = addressUserSaveDB;
            let password = this.generatePassword(6);
            userList[i].password = await hash(password, 8);
            userList[i].firstAcess = true;
            userList[i].temporaryPassword = true;
            let passwordEmail = password;

            let resultSaveUser: Either<Failure, UserDTO> = await this.userRepository.saveUsers(userList[i]);

            if (resultSaveUser.isLeft()) {
                throw resultSaveUser.left();
            }

            let userSaved: UserDTO = resultSaveUser.right();
            this.sendMailAuthenticateUser(userSaved, passwordEmail);

            readCSV.push(userSaved)
        }
        return readCSV
    }


    private async readXLSFiles(file: Express.Multer.File) {
        var xlsxFile = XLSX.readFile(file.path, { cellDates: true })
        var pageName = xlsxFile.Sheets["Usuários"];
        var data: UserDTO[] = XLSX.utils.sheet_to_json(pageName)
        return data;
    }

    private async saveUserXLXSFiles(file: Express.Multer.File) {
        const readXML = await this.readXLSFiles(file);

        readXML.forEach(async (user) => {
            let address: Address = new Address();
            address.streetName = user.streetName;
            address.zipCode = user.zipCode;
            address.numberAddress = user.numberAddress;
            address.complement = user.complement;
            user.address = address;

            if (user.status === StatusEnum.Habilitado) {
                user.active = true;
                user.blocked = false;
            } else if (user.status === StatusEnum.Desabilitado) {
                user.active = false;
                user.blocked = false;
            } else if (user.status === StatusEnum.Bloqueado) {
                user.active = false;
                user.blocked = true;
            }
            let userEmail: Either<Failure, User> = await this.userRepository.findByEmail(user.email);
            let userEmailAlreadyExists = userEmail.right();
            if (userEmailAlreadyExists) {
                throw Failure.userEmailAlreadyExists;
            }
            let userFindCpf: Either<Failure, User> = await this.userRepository.findByCpf(user.cpf)
            let userCpfAlreadyExists = userFindCpf.right();
            if (userCpfAlreadyExists) {
                throw Failure.userCpfAlreadyExists;
            }
            // await this.validateUserFrom(user);

            let addressUserSaveDB: Address = await this.addressRepository.save(user.address);

            user.address = addressUserSaveDB;
            let password = this.generatePassword(6);
            user.password = await hash(password, 8);
            user.firstAcess = true;
            user.temporaryPassword = true;
            let passwordEmail = password;

            let resultSaveUser: Either<Failure, UserDTO> = await this.userRepository.saveUsers(user);

            if (resultSaveUser.isLeft()) {
                throw resultSaveUser.left();
            }

            let userSaved: UserDTO = resultSaveUser.right();
            this.sendMailAuthenticateUser(userSaved, passwordEmail);
            return userSaved;
        });

        return readXML;
    }

    async sendMailAuthenticateUser(user: any, passwordEmail: any) {
        const tokenNewUser = await this.tokenUtil.generateToken({ id: user.id, email: user.email, name: user.name });
        const mail: Mail = this.mailFactory.factoryRegisterMail(user, passwordEmail, tokenNewUser);
        this.mailProvider.send(mail)
    }

    private async validateUserFrom(user: UserDTO) {
        let userEmail: Either<Failure, User> = await this.userRepository.findByEmail(user.email);
        let userFindCpf: Either<Failure, User> = await this.userRepository.findByCpf(user.cpf)
        let userEmailAlreadyExists = userEmail.right();
        let userCpfAlreadyExists = userFindCpf.right();

        if (userEmailAlreadyExists) {
            throw Failure.userEmailAlreadyExists;
        }

        if (userCpfAlreadyExists) {
            throw Failure.userCpfAlreadyExists;
        }
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

export default ImportUserUseCase;