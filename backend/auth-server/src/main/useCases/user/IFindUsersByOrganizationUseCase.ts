import UserDTO from "src/main/dto/UserDTO";

export default interface IFindUsersByOrganizationUseCase {
    execute(configPagination: any): Promise<{ users: UserDTO[], count: number }>
}