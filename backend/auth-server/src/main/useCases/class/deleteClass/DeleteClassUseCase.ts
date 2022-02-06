import { Failure } from "@errors/Failure";
import IClassRepository from "@repositories/class/IClassRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IDeleteClassUseCase from "./IDeleteClassUseCase";

@injectable()
export default class DeleteClassUseCase implements IDeleteClassUseCase {
    constructor(
        @inject(TYPES.classRepository)
        private readonly classRepository: IClassRepository
    ) {
    }

    async execute(id: number) {
        const resultClass = await this.classRepository.findById(id);
        let classDb = resultClass.right();

        if (resultClass.isLeft()) {
            throw Failure.ClassNotExist
        }

        classDb.deleted = true;

        await this.classRepository.update(classDb, classDb.id)
    }
}