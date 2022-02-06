import { Organization } from "@models/Organization";
import { User } from "@models/User";

export default interface ICreateUserOrganizationUseCase {
    execute(user: User, organization: Organization): Promise<User>;

}