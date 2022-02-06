import UserDTO from "../dto/UserDTO";

export default interface IUserBuilder {
    build(data: any): UserDTO;
    configure(data: any);
}