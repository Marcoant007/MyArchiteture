import { UserStatusEnum } from "../Enum/UserStatusEnum";
import AddressDTO from "./AddressDTO";
import OrganizationAdminDTO from "./OrganizationDTO";
import { UserTypeEnum } from "./UserTypeEnum";
export default class CreateUserDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  cpf: string;
  email: string;
  cellPhone?: string;
  registration?: string;
  userType: UserTypeEnum;
  status: UserStatusEnum;
  address: AddressDTO;
  organization?: OrganizationAdminDTO;

  constructor() {
    this.address = new AddressDTO();
  }
}
