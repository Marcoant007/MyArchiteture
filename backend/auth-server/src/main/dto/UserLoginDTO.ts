import DefaultDTO from "./DefaultDTO";

export default class UserLoginDTO {
    id: number
    name: string;
    email: string;
    type: string;
    organization: DefaultDTO;
    clincics?: DefaultDTO[];
    groups: DefaultDTO[];
    permissions: string[];
    tenant?: string;
    profileImg?: string;

    constructor() {

    }
}