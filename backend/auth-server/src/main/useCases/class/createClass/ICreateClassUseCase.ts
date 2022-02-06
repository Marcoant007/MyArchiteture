import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Class } from "@models/Class";
import ClassDTO from "src/main/dto/ClassDTO";

export default interface ICreateClassUseCase {
    execute(classStudent: ClassDTO): Promise<Class>
}