import { Failure } from "@errors/Failure";
import ICourseRepository from "@repositories/course/ICourseRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IDeleteCourseUseCase from "./IDeleteCourseUseCase";

@injectable()
class DeleteCourseUseCase implements IDeleteCourseUseCase {

    constructor(
        @inject(TYPES.courseRepository)
        private readonly courseRepository: ICourseRepository
    ) { }

    async  execute(id: number) {
        const courseRepository = await this.courseRepository.findById(id);

        const courseDB = courseRepository.right();

        if(!courseDB){
            throw Failure.courseNotExists
        }

        courseDB.deleted = true;

        await this.courseRepository.update(courseDB);
    }

}

export default DeleteCourseUseCase;