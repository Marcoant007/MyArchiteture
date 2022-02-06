import { Failure } from "@errors/Failure";
import { Class } from "@models/Class";
import ClassRepository from "@repositories/class/ClassRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import ClassDTO from "src/main/dto/ClassDTO";
import ICreateClassUseCase from "./ICreateClassUseCase";

@injectable()
export default class CreateClassUseCase implements ICreateClassUseCase {

    constructor(
        @inject(TYPES.classRepository)
        private readonly classRepository: ClassRepository
    ) { }

    async execute(classStudent: ClassDTO): Promise<Class> {

        let classResult = await this.classRepository.findClassByCode(classStudent.codeClass);

        if (classResult.right()) {
            throw Failure.ClassCodeAlreadyExist
        }

        let classSave = new Class();
        classSave.codeClass = classStudent.codeClass;
        classSave.courseId = classStudent.courseId;
        classSave.startDate = classStudent.startDate;
        classSave.grid = classStudent.grid;
        classSave.name = classStudent.name;

        const resultClassSave = await this.classRepository.save(classSave);

        if (resultClassSave.isLeft()) {
            throw Failure.ClassErrorSave
        }

        const classDbSave = resultClassSave.right();

        return classDbSave
    }
}