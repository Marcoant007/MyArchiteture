import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Class } from "@models/Class";
import ClassRepository from "@repositories/class/ClassRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IFindClassByIdUseCase from "./IFindClassByIdUseCase";

@injectable()
export default class FindClassByIdUseCase implements IFindClassByIdUseCase {

    constructor(
        @inject(TYPES.classRepository)
        private readonly classRepository: ClassRepository
    ) { }

    async execute(id: number): Promise<Class> {
        let idClass = id;
        const resultDb = await this.classRepository.findById(idClass);

        if (resultDb.isLeft()) {
            throw Failure.ClassNotExist;
        }

        const classDb = resultDb.right();

        return classDb
    }
}