import AddressDTO from "../dtos/AddressDTO";
import { UserDTO } from "../dtos/UserDTO";

export class UserXLS {
    Nome: string;
    Email: string;
    CPF: string;
    Matricula: string;
    Perfil: string;
    // Rua: string;
    // Numero: string;
    // Complemento: string;
    // CEP: string;
   


    constructor(user: UserDTO){
        this.Nome = user.name;
        this.Email = user.email;
        this.CPF = user.cpf;
        this.Matricula = user.registration;
        this.Perfil = user.userType;
        // this.Rua = user.address.streetName;
        // this.Numero = user.address.numberAddress;
        // this.Complemento = user.address.complement;
        // this.CEP = user.address.zipCode;
    }
}