import { UserTypeEnum } from "@models/UserTypeEnum";

export default interface IFindUserTypesUseCase {
    execute():Promise<UserTypeEnum[]>
}