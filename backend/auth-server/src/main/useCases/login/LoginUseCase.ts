
import { compare } from "bcryptjs";
import { inject, injectable } from 'inversify';

import TYPES from '@types';
import { User } from '@models/User';
import ILoginUseCase from './ILoginUseCase';
import IUserRepository from '@repositories/user/IUserRepository';
import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import DefaultDTO from "src/main/dto/DefaultDTO";
import { Group } from "@models/Group";
import UserDTO from "src/main/dto/UserDTO";
import IOrganizationRepository from "@repositories/organization/IOrganizationRepository";
import { Organization } from "@models/Organization";
@injectable()
class LoginUseCase implements ILoginUseCase {

  constructor(@inject(TYPES.userRepository)
  private readonly userRepository: IUserRepository,
  @inject(TYPES.organizationRepository)
  private readonly organizationRepository: IOrganizationRepository) {
  }

  async execute(user: User): Promise<UserDTO> {

    let userDb = await this.getUserByEmailOrLogin(user);

    let UserPermissions = await this.getUserGroupHasPemission(user);

    this.userExists(userDb); // verifica se o usuario existe

    await this.verifyUserBlocked(userDb)

    await this.userPasswordIsVerified(userDb, user); // verifica a senha 

    const groups = UserPermissions.userHasGroups.map(userHasGroup => userHasGroup.group);

    const userDTO = new UserDTO(userDb);
    userDTO.id = userDb.id;
    userDTO.name = userDb.name;
    userDTO.email = userDb.email;
    userDTO.userType = userDb.userType;
    userDTO.groups = groups.map(group => new DefaultDTO(group));
    userDTO.permissions = this.buildListPermissionsByGroups(groups);
    userDTO.firstAcess = userDb.firstAcess;
    userDTO.temporaryPassword = userDb.temporaryPassword;

    await this.fistAccessUser(userDb)

    this.userMailIsChecked(userDb);

    await this.userOrganizationLogin(userDb);

    this.verifyUserInactive(userDb);
    
    return userDTO;
  }

  private async userOrganizationLogin(user:User){
    let userResult: Either<Failure, User> = await this.userRepository.findByEmailOrLogin(user);
    const userDB = userResult.right();

    if(userDB.organization){
    if(!userDB.organization.active){
      user.active = false;
      throw Failure.userAccoutIsInstituitionNotActive;
    }
    }
  }

  private async fistAccessUser(user: User) {
    let userResult: Either<Failure, User> = await this.userRepository.findByEmailOrLogin(user);
    const userDb = userResult.right();

    if (!userDb) {
      user.firstAcess = true
      await this.userRepository.update(user);
    }
  }

  private async verifyUserBlocked(user: User) {
    if (user.blocked) {
      throw Failure.userLoginBlocked;
    }
  }

  private async getUserGroupHasPemission(user: User) {
    let userDB: Either<Failure, User> = await this.userRepository.findbyGroupHasPermissionUser(user);

    if (userDB.isLeft()) {
      throw Failure.userGroupOrPermissionNotExists;
    }

    let userSaved = userDB.right();
    return userSaved;
  }

  private async getUserByEmailOrLogin(user: User) {
    let userResult: Either<Failure, User>
      = await this.userRepository.findByEmailOrLogin(user);

    if (userResult.isLeft()) {
      throw Failure.userOrPasswordIncorrect;
    }

    let userDb = userResult.right();
    return userDb;
  }

  private verifyUserInactive(userDb: User) {
    if (!userDb.active) {
      throw Failure.userAccoutIsNotActive;
    }
  }

  private userMailIsChecked(userDb: User) {
    if (!userDb.emailChecked) {
      throw Failure.userMailUnconfirmed;
    }
  }


  private async userPasswordIsVerified(userDb: User, user: User) {
    let passwordIsValid = await this.verifyPassordIsValid(userDb.password, user.password, userDb);
    if (passwordIsValid === undefined) {
      throw Failure.userOrPasswordIncorrect;
    }
  }

  private async userBlockedUser(userDb: User) {
    userDb.attempt = userDb.attempt + 1;
    if (userDb.attempt >= 5) {
      userDb.blocked = true
      await this.userRepository.update(userDb);
      throw Failure.userBlocked;
    }
    await this.userRepository.update(userDb);
  }


  private userExists(userDb: User) {
    if (!userDb) {
      throw Failure.userNotExists;
    }
  }

  private async verifyPassordIsValid(expectedPassword: string, password: string, userDb: User): Promise<boolean> {
    const passwordMatched: boolean = await compare(password, expectedPassword);

    if (!passwordMatched) {
      let attempt = await this.userBlockedUser(userDb)
      throw Failure.userOrPasswordIncorrect;
    }

    return passwordMatched;
  }

  private buildListPermissionsByGroups(groups: Group[]): string[] {

    const permissions = [];

    groups.forEach(group => {
      group.groupHasPermissions.forEach(ghp => {
        permissions.push(ghp.permission.value)
      })
    });

    const uniquePermissions = [... new Set(permissions)];
    return uniquePermissions;
  }

}

export default LoginUseCase;
