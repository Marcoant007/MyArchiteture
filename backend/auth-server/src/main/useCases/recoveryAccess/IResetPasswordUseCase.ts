import NewPassword from "src/main/dto/NewPasswordDTO";
export default interface IResetPasswordUseCase {
    execute(credentials: NewPassword, token: string): Promise<string>;
}