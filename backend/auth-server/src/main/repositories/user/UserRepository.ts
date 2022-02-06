import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { User } from "@models/User";
import { UserTypeEnum } from "@models/UserTypeEnum";
import { injectable } from "inversify";
import UserDTO from "src/main/dto/UserDTO";
import { Brackets, getRepository, Repository } from "typeorm";
import IUserRepository from "./IUserRepository";

@injectable()
class UserRepository implements IUserRepository {

    private ormRepository: Repository<User>;
    private pagination: Pagination;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public setPagination(pagination: Pagination) {
        this.pagination = pagination;
    }

    findByLoginAndPassword(): Promise<Either<Failure, User>> {
        throw new Error("Method not implemented.");//TODO se não precisa tirar
    }

    async find(name: string, userType: string): Promise<Either<Failure, { userDb: User[], count: number } | undefined>> {
        try {
            const offset = this.pagination.offset();
            const limit = this.pagination.limit();

            let query = this.ormRepository.createQueryBuilder("user")
                .leftJoinAndSelect('user.organization', 'organization')
                .leftJoinAndSelect('user.address', 'address') // busca as informações da tabela de endereços
                .where("user.deleted = false")
                .limit(limit)
                .offset(offset)
                .orderBy(`user.name`, "ASC")

            if (name) {
                query.andWhere("user.name ilike :name", { name: `%${name}%` });
            }

            if (userType) {
                query.andWhere("user.userType ilike :userType", { userType: `%${userType}%` });
            }

            const [userDb, count] = await query.getManyAndCount();
            return Either.right({ userDb, count });
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findUserTypes(): Promise<Either<Failure, UserTypeEnum[]>> {
        try {
            const userTypes = Object.values(UserTypeEnum)
            console.log(userTypes)
            return Either.right(userTypes);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async save(user: User): Promise<Either<Failure, User>> {
        try {
            const userDB = await this.ormRepository.save(user);
            return Either.right(userDB);
        } catch (error) {
            return Either.left(error.message);
        }
    }


    async saveUsers(user: UserDTO): Promise<Either<Failure, UserDTO>> {
        try {
            const userDB = await this.ormRepository.save(user);
            return Either.right(userDB);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async update(user: User): Promise<Either<Failure, Boolean>> {
        try {
            await this.ormRepository.update(user.id, user);
            return Either.right(true);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findByEmail(email: string): Promise<Either<Failure, User>> {
        try {
            const findEmail = await this.ormRepository.findOne({
                where: {
                    email: email,
                    deleted: false
                }
            })
            console.log(findEmail)
            return Either.right(findEmail)
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findById(id: number): Promise<Either<Failure, User>> {
        try {
            const userDB = await this.ormRepository.createQueryBuilder("user")
                .leftJoinAndSelect("user.address", "address")
                .where("user.id = :id", { id })
                .andWhere("user.deleted = false")
                .getOneOrFail();

            return Either.right(userDB);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findByIdOrEmail(id: number, email: string): Promise<Either<Failure, User>> {
        try {
            const userDB = await this.ormRepository.findOne({ where: { id, email } });
            return Either.right(userDB);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findByNameUser(name: string): Promise<Either<Failure, User>> {
        try {
            const findName = await this.ormRepository.findOne({
                where: { name: name }
            })
            return Either.right(findName)
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findByCpf(cpf: string): Promise<Either<Failure, User>> {
        try {
            const findCpf = await this.ormRepository.findOne({
                where: { cpf: cpf }
            })
            return Either.right(findCpf)
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findByIdAndEmail(id: number, email: string): Promise<Either<Failure, User>> {
        try {
            const user = await this.ormRepository.findOne({ where: { id, email } });
            return Either.right(user)
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findUserByRegistration(registration: string): Promise<Either<Failure, User>> {
        try {
            const findRegistration = await this.ormRepository.findOne({
                where: { registration: registration }
            })
            return Either.right(findRegistration)
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findByEmailOrLogin(user: User): Promise<Either<Failure, User>> {
        try {
            const userDb = await this.ormRepository
                .createQueryBuilder("user")
                .where('user.deleted = false')
                .leftJoinAndSelect('user.organization', 'organization')
                .andWhere(new Brackets(qb => {
                    qb.where('user.email = :email', { email: user.email })
                        .orWhere('user.name = :name', { name: user.name })
                }))
                .getOne();

            return Either.right(userDb);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findbyGroupHasPermissionUser(user:User): Promise<Either<Failure, User>>{
        try {
            const userDB = await this.ormRepository
                .createQueryBuilder("user")
                .where('user.deleted = false')
                .leftJoinAndSelect('user.userHasGroups', 'listGroups')
                .leftJoinAndSelect('listGroups.group', 'groups')
                .leftJoinAndSelect('groups.groupHasPermissions', 'listPermissions')
                .leftJoinAndSelect('listPermissions.permission', 'permissions')
                .getOne();
                return Either.right(userDB);
        } catch (error) {
            return Either.left(error.message);
        }

    }


    async findByCpfOrCode(cpfOrCode: string): Promise<Either<Failure, User>> {
        try {
            const userDb = await this.ormRepository
                .createQueryBuilder("user")
                .where('user.deleted = false')
                .andWhere(new Brackets(qb => {
                    qb.where('user.cpf = :cpf', { cpf: cpfOrCode })
                        .orWhere('user.code = :code', { code: cpfOrCode })
                }))
                .getOne();

            return Either.right(userDb);

        } catch (error) {
            return Either.left(error.message);
        }
    }


   

    async findUsersByOrganization(id: number, name: string, userType: string): Promise<Either<Failure, { userDb: User[], count: number }>> {
        try {
            const offset = this.pagination.offset();
            const limit = this.pagination.limit();

            const query = this.ormRepository
                .createQueryBuilder("user")
                .leftJoinAndSelect('user.organization', 'organization')
                .where("user.organization_id = :id", { id: id })
                .andWhere("user.deleted = false")
                .limit(limit)
                .offset(offset)
                .orderBy(`user.name`, "ASC")

            if (name) {
                query.andWhere("user.name ilike :name", { name: `%${name}%` });
            }

            if (userType) {
                query.andWhere("user.userType ilike :userType", { userType: `%${userType}%` });
            }


            const [userDb, count] = await query.getManyAndCount()
            return Either.right({ userDb, count })
        } catch (error) {
            return Either.left(error.message)
        }
    }
}

export default UserRepository;
