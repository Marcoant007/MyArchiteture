import InstituitionAdminDTO from "src/main/dto/InstituitionDTO";

export default interface IFindInstituitionUseCase {
    execute(page, limit): Promise<{ instituitions: InstituitionAdminDTO[], count: number }>
}