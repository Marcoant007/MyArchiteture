import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { HelpPages } from "@models/HelpPages";

export default interface IHelpCenterRepository {
    find(profile: string,language:string):Promise<Either<Failure,{helpDB:HelpPages[], count:number} | undefined>>;
    findByID(id:number):Promise<Either<Failure, HelpPages>>
    setPagination(pagination: Pagination): void;

}