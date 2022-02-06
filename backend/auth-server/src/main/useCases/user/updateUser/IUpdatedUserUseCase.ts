import UserDTO from "src/main/dto/UserDTO";

export default interface IUpdatedUserUseCase {
    execute(userDTO: UserDTO, id: number)
}