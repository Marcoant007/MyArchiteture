import { Pagination } from "@database/Pagination";
import IClassRepository from "@repositories/class/IClassRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import ClassDTO from "src/main/dto/ClassDTO";
import IFindClassUseCase from "./IFindClassUseCase";

@injectable()
export default class FindClassUseCase implements IFindClassUseCase {
    constructor(
        @inject(TYPES.classRepository)
        private readonly classRepository: IClassRepository
    ) {
    }
    async execute(page: number, limit: number): Promise<{ classStudents: ClassDTO[]; count: number; }> {
        const pagination = new Pagination(page, limit);
        this.classRepository.setPagination(pagination);
        const classRepository = await this.classRepository.find();
        const { classDB, count } = classRepository.right();
        const classStudents = classDB.map(classStd => new ClassDTO(classStd));
        const response = { classStudents, count };

        return response;
    }
}