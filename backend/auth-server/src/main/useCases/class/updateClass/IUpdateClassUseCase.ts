import ClassDTO from "src/main/dto/ClassDTO";

export default interface IUpdateClassUseCase {
    execute(classStudents: ClassDTO, id: number)
}