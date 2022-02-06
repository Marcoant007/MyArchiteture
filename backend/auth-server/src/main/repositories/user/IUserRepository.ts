import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { User } from "@models/User";
import { UserTypeEnum } from "@models/UserTypeEnum";
import UserDTO from "src/main/dto/UserDTO";

export default interface IUserRepository {

    setPagination(pagination: Pagination): void;

    find(name: string, userType: string): Promise<Either<Failure, { userDb: User[], count: number } | undefined>>;

    findById(user_id: number): Promise<Either<Failure, User>>;

    findUserTypes(): Promise<Either<Failure, UserTypeEnum[]>>;

    findByLoginAndPassword(): Promise<Either<Failure, User>>;
    
    saveUsers(user:  UserDTO): Promise<Either<Failure,  UserDTO>>

    save(user: User): Promise<Either<Failure, User>>;

    update(user: User): Promise<Either<Failure, Boolean>>;

    findByEmailOrLogin(user: User): Promise<Either<Failure, User>>;

    findByIdOrEmail(id: number, email: string): Promise<Either<Failure, User>>;

    findByEmail(email: string): Promise<Either<Failure, User>>;

    findbyGroupHasPermissionUser(user:User): Promise<Either<Failure, User>>

    findByNameUser(name: string): Promise<Either<Failure, User>>;

    findByCpf(cpf: string): Promise<Either<Failure, User>>;

    findByCpfOrCode(cpfOrCode: string): Promise<Either<Failure, User>>;

    findByIdAndEmail(id: number, email: string): Promise<Either<Failure, User>>;

    findUserByRegistration(registration: string): Promise<Either<Failure, User>>;

    findUsersByOrganization(id: number, name: string, userType: string): Promise<Either<Failure, { userDb: User[], count: number } | undefined>>;
}
