import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Class } from "@models/Class";

export default interface IFindClassByIdUseCase {
    execute(id: number): Promise<Class>
}