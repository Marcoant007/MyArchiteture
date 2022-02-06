import { User } from "@models/User";

export default interface IStatusUserUseCase {
    execute(id: number, status: string): Promise<User>
}