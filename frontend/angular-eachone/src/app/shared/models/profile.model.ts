
/**
 * Classe com os atributos enviados pelo servidor logo após o login do usuário se realizado com sucesso.
 */
export class ProfileModel {
  userId: number;
  userEmail: string;
  userName: string;
  token: string;
  userType: string;
  organization: any;
  groups: any[];
  permissions: any[];
  selectedClinic: any;
  userImg: string;

  load(obj: any) {
    this.userId = obj.id;
    this.userEmail = obj.email;
    this.userName = obj.name;
    this.token = obj.token;
    this.userType = obj.userType;
    this.organization = obj.organization;
    this.groups = obj.groups;
    this.permissions = obj.permissions;
    this.userImg = obj.url_img ? obj.url_img : 'https://eachone-dev001.s3.amazonaws.com/user-profile.png'
  }
}

export class Status {
  saas: boolean;

  load(isSaas: any) {
    this.saas = isSaas;
  }
}
