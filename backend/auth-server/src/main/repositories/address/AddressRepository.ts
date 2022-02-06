import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Address } from "@models/Address";
import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import IAdrressRepository from "./IAddressRepository";

@injectable()
export default class AddressRepository implements IAdrressRepository {
    private ormRepository: Repository<Address>;

    constructor() {
        this.ormRepository = getRepository(Address);
    }

    public async findByNameAdress(streetName: string): Promise<Either<Failure, Address | undefined>> {
        try {
            const address = await this.ormRepository.createQueryBuilder("address")
                .where("address.streetName = :streetName", { streetName: streetName })
                .getOne();

            return Either.right(address);
        } catch (error) {
            return Either.left(error)
        }
    }

    public async save(address: Address): Promise<Address | undefined> {
        const addressDB = await this.ormRepository.save(address);
        return addressDB;
    }

    async findById(id: number): Promise<Either<Failure, Address>> {
        try {
            const userDB = await this.ormRepository.findOne({
                where: { id }
            })
            return Either.right(userDB) 

        } catch (error) {
            return Either.left(error)
        }
    }


    async update(address: Address): Promise<Either<Failure, Boolean>> {
        try {
            await this.ormRepository.update(address.id, address);
            return Either.right(true);
        } catch (error) {
            return Either.left(error)
        }
    }
}