import { Failure } from "@errors/Failure";
import { User } from "@models/User";
import { injectable } from "inversify";
import UserDTO from "../dto/UserDTO";
import IUserBuilder from "./IUserBuilder";

@injectable()
class UserBuilder implements IUserBuilder {


    private colums = [
        "name",
        "email",
        "cpf",
        "userType",
        "registration",
        "cellPhone",
        "birthDate",
        "streetName",
        "complement",
        "numberAddress",
        "zipCode",
        "status"
    ];

    private columsConfig = {};

    configure(data: any) {
        if (!data) {
            throw Failure.configureHearderOfUserBuilderIsMandatory;
        }
        const fileColums = data;

        for (let i = 0; i <= fileColums.length; i++) {
            const column = fileColums[i];

            if (this.contains(column)) {
                this.columsConfig[column] = i;
            }
        }
    }

    build(data: any): UserDTO {
        let user: UserDTO = new User();
        

        if (!data) {
            throw Failure.userBuilderCantBeBlanckLines;
        }

        let line = data;

        user.name = line[0];
        user.email = line[this.columsConfig["email"]];
        user.cpf = line[this.columsConfig["cpf"]];
        user.userType = line[this.columsConfig["userType"]];
        user.registration = line[this.columsConfig["registration"]];
        user.cellPhone = line[this.columsConfig["cellPhone"]];
        user.birthDate = line[this.columsConfig["birthDate"]];
        user.zipCode = line[this.columsConfig["zipCode"]];
        user.streetName = line[this.columsConfig["streetName"]];
        user.numberAddress = line[this.columsConfig["numberAddress"]];
        user.complement = line[this.columsConfig["complement"]];
        user.status = line[this.columsConfig["status"]];
        return user;

    }

    private contains(column: string): boolean {
        let contains = this.colums.find((x) => {
         return x === column
        })

        if (contains) {
            return true;
        }
        return false;
    }
}

export default UserBuilder;
