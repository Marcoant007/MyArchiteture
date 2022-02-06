import { Failure } from "@errors/Failure";
import { Class } from "@models/Class";
import IClassRepository from "@repositories/class/IClassRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import ClassDTO from "src/main/dto/ClassDTO";
import IUpdateClassUseCase from "./IUpdateClassUseCase";

@injectable()
export default class UpdateClassUseCase implements IUpdateClassUseCase {

    constructor(
        @inject(TYPES.classRepository)
        private readonly classRepository: IClassRepository
    ) { }

    async execute(classStudents: ClassDTO, id: number) {
        const classResult = await this.classRepository.findById(id);

        if (classResult.isLeft()) {
            throw Failure.ClassNotExist;
        }

        let classDb = classResult.right();
        classDb = await this.updateClassFields(classDb, classStudents);

        const resultClassSave = await this.classRepository.update(classDb, id);

        if (resultClassSave.isLeft()) {
            throw Failure.ClassErrorUpdate;
        }

        return { message: "Classe atualizada com sucesso!", code: 200 }
    }

    async updateClassFields(classDb: Class, classDTO: ClassDTO) {
        classDb.id = classDTO.id;
        classDb.codeClass = classDTO.codeClass;
        classDb.courseId = classDTO.courseId;
        classDb.grid = classDTO.grid;
        classDb.name = classDTO.name;
        classDb.startDate = classDTO.startDate;

        await this.hasCodeClass(classDb.codeClass, classDb.id);

        return classDb
    }

    async hasCodeClass(code: string, id: number) {
        let result = await this.classRepository.findClassByCode(code);
        let classByCode = result.right()

        if (classByCode) {
            if (classByCode.id !== id) {
                throw Failure.ClassCodeAlreadyExist
            }
        }
    }
}