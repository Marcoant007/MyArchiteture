import ClassDTO from "src/main/dto/ClassDTO";

export default interface IFindClassUseCase {
    execute(page: number, limit: number): Promise<{ classStudents: ClassDTO[], count: number }>
}