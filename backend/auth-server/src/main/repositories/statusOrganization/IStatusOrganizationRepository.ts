import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { StatusOrganization } from "@models/StatusOrganization";

export default interface IStatusOrganization {
    findStatus(status: string) :  Promise<Either<Failure, StatusOrganization>> 
}

