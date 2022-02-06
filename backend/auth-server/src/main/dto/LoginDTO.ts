import { User } from "@models/User";

export default class LoginDTO {
    id: number
    name: string;
    email: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}