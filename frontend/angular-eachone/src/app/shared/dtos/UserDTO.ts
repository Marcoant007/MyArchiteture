import AddressDTO from "./AddressDTO";

export class UserDTO {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    password: string;
    active: boolean;
    firstAcess: boolean;
    email: string;
    temporaryPassword: boolean;
    cpf: string;
    userType: string;
    registration: string;
    blocked: boolean;
    attempt: number | null;
    emailChecked: boolean;
    urlImg: string | null;
    code: string;
    address?: AddressDTO;

    constructor( ) {
      this.id = null;
      this.name =  null;
      this.email = null;
      this.password = null;
      this.active = null;
      this.firstAcess = null;
      this.temporaryPassword = null;
      this.cpf = null;
      this.blocked = null;
      
    }
}
