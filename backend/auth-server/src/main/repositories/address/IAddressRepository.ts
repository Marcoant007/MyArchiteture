import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Address } from "@models/Address";
export default interface IAdrressRepository {
    findByNameAdress(name: string): Promise<Either<Failure, Address | undefined>>;
    save(address: Address): Promise<Address | undefined>;
    update(address: Address): Promise<Either<Failure, Boolean>>;
    findById(id: number): Promise<Either<Failure, Address>>;
}