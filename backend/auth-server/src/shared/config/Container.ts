import TYPES from "@types";
import { AsyncContainerModule } from "inversify";
import { createConnection } from "typeorm";
import Validators from "@util/Validators";
import NodemailerProvider from "@providers/mail/NodemailerProvider";
import LoginUseCase from "@useCases/login/LoginUseCase";
import AuthController from "@controllers/AuthController";
import ILoginUseCase from "@useCases/login/ILoginUseCase";
import IMailProvider from "@providers/mail/IMailProvider";
import UserRepository from "@repositories/user/UserRepository";
import IUserRepository from "@repositories/user/IUserRepository";
import TokenUtil from "@util/TokenUtil";
import MailFactory from "@providers/mail/MailFactory";
import GenerateTokenUseCase from "@useCases/token/GenerateTokenUseCase";
import IGenerateTokenUseCase from "@useCases/token/IGenerateTokenUseCase";
import InstituitionAndAdminController from "@controllers/InstituitionAdminController";
import RegisterInstituitionAndAdminUseCase from "@useCases/InstituitionAdmin/RegisterInstituitionAndAdminUseCase";
import IRegisterInstituitionAndAdminUseCase from "@useCases/InstituitionAdmin/IRegisterInstituitionAndAdminUseCase";
import OrganizationRepository from "@repositories/organization/OrganizationRepository";
import IOrganizationRepository from "@repositories/organization/IOrganizationRepository";
import StatusOrganizationRepository from "@repositories/statusOrganization/StatusOrganizationRepository";
import IStatusOrganizationRepository from "@repositories/statusOrganization/IStatusOrganizationRepository";
import IRecoveryAccess from "@useCases/recoveryAccess/IRecoveryAccessUseCase";
import RecoveryAccess from "@useCases/recoveryAccess/RecoveryAccessUseCase";
import IRecoverUserEmailUseCase from "@useCases/recoveryAccess/IRecoverUserEmailUseCase";
import RetriveAcessController from "@controllers/RetriveAcessController";
import RecoverUserEmailUseCase from "@useCases/recoveryAccess/RecoverUserEmailUseCase";
import IResetPasswordUseCase from "@useCases/recoveryAccess/IResetPasswordUseCase";
import ResetPasswordUseCase from "@useCases/recoveryAccess/ResetPasswordUseCase";
import IValidateRegisterTokenUseCase from "@useCases/token/IValidateRegisterTokenUseCase";
import ValidadeRegisterTokenUseCase from "@useCases/token/ValidateRegisterTokenUseCase";
import UserController from "@controllers/UserController";
import ICreateUserUseCase from "@useCases/user/createUser/ICreateUserUseCase";
import AddressRepository from "@repositories/address/AddressRepository";
import IAdrressRepository from "@repositories/address/IAddressRepository";
import { MulterMiddleware } from "../http/middleware/MulterMiddleware";
import DeleteUserUseCase from "@useCases/user/deleteUser/DeleteUserUseCase";
import IDeleteUserUseCase from "@useCases/user/deleteUser/IDeleteUserUseCase";
import IHelpCenterRepository from "@repositories/helpCenter/IHelpCenterRepository";
import HelpCenterRepository from "@repositories/helpCenter/HelpCenterRepository";
import IFindHelpCenterUseCase from "@useCases/helpCenter/IFindHelpCenterUseCase";
import FindHelpCenterUseCase from "@useCases/helpCenter/FindHelpCenterUseCase";
import { AlarmMessageTransport } from "@providers/kafka/alarm/AlarmMessageTransport";
import IMessageProvider from "@providers/kafka/IMessageProvider";
import { KafkaMessageProvider } from "@providers/kafka/KafkaMessageProvider";
import IFindHelpCenterByIDUseCase from "@useCases/helpCenter/IFindHelpCenterByIDUseCase";
import IFindInstituitionUseCase from "@useCases/InstituitionAdmin/IFindInstituitionUseCase";
import FindInstituitionUseCase from "@useCases/InstituitionAdmin/FindInstituitionUseCase";
import IDeleteInstituitionUseCase from "@useCases/InstituitionAdmin/IDeleteInstituitionUseCase";
import DeleteInstituitionUseCase from "@useCases/InstituitionAdmin/DeleteInstituitionUseCase";
import IFindInstituitionByIdUseCase from "@useCases/InstituitionAdmin/IFindInstituitionByIdUseCase";
import FindInstituitionByIdUseCase from "@useCases/InstituitionAdmin/FindInstituitionByIdUseCase";
import IFindUsersByOrganizationUseCase from "@useCases/user/IFindUsersByOrganizationUseCase";
import FindUsersByOrganizationUseCase from "@useCases/user/FindUsersByOrganizationUseCase";
import HelpCenterController from "@controllers/HelpCenterController";
import FindHelpCenterByIDUseCase from "@useCases/helpCenter/FindHelpCenterUseCaseByID";
import LanguagesController from "@controllers/LanguagesController";
import LanguageRepository from "@repositories/languages/LanguagesRepository";
import FindLanguagesUseCase from "@useCases/languages/findLanguages/FindLanguagesUseCase";
import ChargeController from "@controllers/ChargeController";
import IFindChargesByOrganizationUseCase from "@useCases/charges/IFindChargesByOrganizationUseCase";
import FindChargesByOrganizationUseCase from "@useCases/charges/FindChargesByOrganizationUseCase";
import ChargeRepository from "@repositories/charges/ChargesRepository";
import IChargeRepository from "@repositories/charges/IChargesRepository";
import UpdateInstitutionUseCase from "@useCases/InstituitionAdmin/UpdateInstitutionUseCase";
import IUpdateInstitutionUseCase from "@useCases/InstituitionAdmin/IUpdateInstitutionUseCase";
import LanguageOrganizationRepository from "@repositories/languageOrganization/LanguageOrganizationRepository";
import ILanguageOrganizationRepository from "@repositories/languageOrganization/ILanguageOrganizationRepository";
import IFindUserUseCase from "@useCases/user/findUser/IFindUserUseCase";
import FindUserUseCase from "@useCases/user/findUser/FindUserUseCase";
import IFindUserTypesUseCase from "@useCases/user/findUserTypes/IFindUserTypesUseCase";
import FindUserTypesUseCase from "@useCases/user/findUserTypes/FindUserTypesUseCase";
import ICreateUserOrganizationUseCase from "@useCases/user/createUserOrganization/ICreateUserOrganizationUseCase";
import CreateUserOrganizationUseCase from "@useCases/user/createUserOrganization/CreateUserOrganizationUseCase";
import CreateUserUseCase from "@useCases/user/createUser/CreateUserUseCase";
import IUpdatedUserUseCase from "@useCases/user/updateUser/IUpdatedUserUseCase";
import UpdatedUserUseCase from "@useCases/user/updateUser/UpdatedUserUseCase";
import IFindUserByIdUseCase from "@useCases/user/findUserByID/IFindUserByIdUseCase";
import FindUserByIdUseCase from "@useCases/user/findUserByID/FindUserByIdUseCase";
import IStatusUserUseCase from "@useCases/user/statusUser/IStatusUserUseCase";
import StatusUserUseCase from "@useCases/user/statusUser/StatusUserUseCase";
import ImportUserUseCase from "@useCases/user/importUser/ImportUserUseCase";
import IImportUserUseCase from "@useCases/user/importUser/IImportUserUseCase";
import IUploadImageOrganization from "@useCases/InstituitionAdmin/IUploadImageOrganization";
import UploadImageOrganization from "@useCases/InstituitionAdmin/UploadImageOrganization";
import IUserBuilder from "src/main/builders/IUserBuilder";
import UserBuilder from "src/main/builders/UserBuilder";
import IConfigUserUseCase from "@useCases/user/configUser/IConfigUserUseCase";
import ConfigUserUseCase from "@useCases/user/configUser/ConfigUserUseCase";
import IFindLanguagesUseCase from "@useCases/languages/findLanguages/IFindLanguagesUseCase";
import IFindLanguagesEnableUseCase from "@useCases/languages/findLanguagesEnable/IFindLanguagesEnableUseCase";
import FindLanguagesEnableUseCase from "@useCases/languages/findLanguagesEnable/FindLanguagesEnableUseCase";
import ChangeStatusLanguageUseCase from "@useCases/languages/chageStatusLanguage/ChangeStatusLanguageUseCase";
import PlanController from "@controllers/PlanController";
import CreatePlanUseCase from "@useCases/plan/createPlan/CreatePlanUseCase";
import ICreatePlanUseCase from "@useCases/plan/createPlan/ICreatePlanUseCase";
import PlanRepository from "@repositories/plan/PlanRepository";
import IPlanRepository from "@repositories/plan/IPlanRepository";
import IFindPlanUseCase from "@useCases/plan/listPlan/IFindPlanUseCase";
import FindPlanUseCase from "@useCases/plan/listPlan/FindPlanUseCase";
import StatusPlanUseCase from "@useCases/plan/changeStatusPlan/StatusPlanUseCase";
import IStatusPlanUseCase from "@useCases/plan/changeStatusPlan/IStatusPlanUseCase";
import IUpdatePlanUseCase from "@useCases/plan/updatePlan/IUpdatePlanUseCase";
import UpdatePlanUseCase from "@useCases/plan/updatePlan/UpdatePlanUseCase";

import IDeletePlanUseCase from "@useCases/plan/deletePlan/IDeletePlanUseCase";
import DeletePlanUseCase from "@useCases/plan/deletePlan/DeletePlanUseCase";
import CourseRepository from "@repositories/course/CourseRepository";
import ICourseRepository from "@repositories/course/ICourseRepository";
import IChangeStatusLanguageUseCase from "@useCases/languages/chageStatusLanguage/IChangeStatusLanguageUseCase";
import CourseController from "@controllers/CourseController";
import ICreateCourseUseCase from "@useCases/course/createCourse/ICreateCourseUseCase";
import CreateCourseUseCase from "@useCases/course/createCourse/CreateCourseUseCase";
import IFindAllCourseUseCase from "@useCases/course/findAllCourses/IFindAllCourseUseCase";
import FindAllCourseUseCase from "@useCases/course/findAllCourses/FindAllCourseUseCase";
import UpdateCourseUseCase from "@useCases/course/updateCourse/UpdateCourseUseCase";
import IUpdateCourseUseCase from "@useCases/course/updateCourse/IUpdateCourseUseCase";
import StatusCourseUseCase from "@useCases/course/changeStatusCourse/StatusCourseUseCase";
import IStatusCourseUseCase from "@useCases/course/changeStatusCourse/IStatusCourseUseCase";
import FindPlanByIdUseCase from "@useCases/plan/findById/FindPlanByIdUseCase";
import IFindPlanByIdUseCase from "@useCases/plan/findById/IFindPlanByIdUseCase";
import DeleteCourseUseCase from "@useCases/course/deleteCourse/DeleteCourseUseCase";
import IDeleteCourseUseCase from "@useCases/course/deleteCourse/IDeleteCourseUseCase";
import IFindCourseById from "@useCases/course/findCourseById/IFindCourseById";
import FindCourseById from "@useCases/course/findCourseById/FindCourseById";

export const bindings = new AsyncContainerModule(async (bind) => {

    await createConnection();

    bind<MulterMiddleware>(TYPES.multerMiddleware).to(MulterMiddleware);

    // Auth User
    bind<ILoginUseCase>(TYPES.loginUseCase).to(LoginUseCase);
    bind<AuthController>(TYPES.authController).to(AuthController);
    bind<UserController>(TYPES.userController).to(UserController);
    bind<RetriveAcessController>(TYPES.retriveAcessController).to(RetriveAcessController);
    bind<IGenerateTokenUseCase>(TYPES.generateTokenUseCase).to(GenerateTokenUseCase);
    bind<IRecoveryAccess>(TYPES.recoveryAccess).to(RecoveryAccess);

    //Organization

    // Instituition Admin 
    bind<IRegisterInstituitionAndAdminUseCase>(TYPES.registerInstituitionAndAdminUseCase).to(RegisterInstituitionAndAdminUseCase);
    bind<InstituitionAndAdminController>(TYPES.instituitionAndAdminController).to(InstituitionAndAdminController);
    bind<IFindInstituitionUseCase>(TYPES.findInstituitionUsecase).to(FindInstituitionUseCase);
    bind<IDeleteInstituitionUseCase>(TYPES.deleteInstituitionUseCase).to(DeleteInstituitionUseCase);
    bind<IFindInstituitionByIdUseCase>(TYPES.findByIdInstituitionUseCase).to(FindInstituitionByIdUseCase);
    bind<IUpdateInstitutionUseCase>(TYPES.updateInstitutionUseCase).to(UpdateInstitutionUseCase);
    bind<IUploadImageOrganization>(TYPES.uploadImageOrganization).to(UploadImageOrganization);

    // User
    bind<IRecoverUserEmailUseCase>(TYPES.recoverUserEmailUseCase).to(RecoverUserEmailUseCase);
    bind<IResetPasswordUseCase>(TYPES.resetPasswordUseCase).to(ResetPasswordUseCase);
    bind<IValidateRegisterTokenUseCase>(TYPES.validateRegisterTokenUseCase).to(ValidadeRegisterTokenUseCase);
    bind<IFindUserUseCase>(TYPES.findUserUseCase).to(FindUserUseCase);
    bind<IFindUserTypesUseCase>(TYPES.findUserTypesUseCase).to(FindUserTypesUseCase);
    bind<ICreateUserOrganizationUseCase>(TYPES.createOrganizationUserUseCase).to(CreateUserOrganizationUseCase);
    bind<ICreateUserUseCase>(TYPES.createUserUseCase).to(CreateUserUseCase);
    bind<IUpdatedUserUseCase>(TYPES.updatedUserUseCase).to(UpdatedUserUseCase);
    bind<IFindUserByIdUseCase>(TYPES.findUserByIdUseCase).to(FindUserByIdUseCase);
    bind<IStatusUserUseCase>(TYPES.statusUserUseCase).to(StatusUserUseCase);
    bind<IDeleteUserUseCase>(TYPES.deleteUserUseCase).to(DeleteUserUseCase);
    bind<IFindUsersByOrganizationUseCase>(TYPES.findUsersByOrganizationUseCase).to(FindUsersByOrganizationUseCase);
    bind<IImportUserUseCase>(TYPES.importUserUseCase).to(ImportUserUseCase);
    bind<IConfigUserUseCase>(TYPES.configUserUseCase).to(ConfigUserUseCase);

    //Plans
    bind<PlanController>(TYPES.planController).to(PlanController);
    bind<ICreatePlanUseCase>(TYPES.createPlanUseCase).to(CreatePlanUseCase);
    bind<IFindPlanUseCase>(TYPES.findPlanUseCase).to(FindPlanUseCase);
    bind<IPlanRepository>(TYPES.planRepository).to(PlanRepository);
    bind<IStatusPlanUseCase>(TYPES.statusPlanUseCase).to(StatusPlanUseCase);
    bind<IUpdatePlanUseCase>(TYPES.updatePlanUseCase).to(UpdatePlanUseCase);
    bind<IFindPlanByIdUseCase>(TYPES.findPlanByIdUseCase).to(FindPlanByIdUseCase);
    bind<IDeletePlanUseCase>(TYPES.deletePlanUseCase).to(DeletePlanUseCase);

    //Courses
    bind<CourseController>(TYPES.courseController).to(CourseController);
    bind<ICreateCourseUseCase>(TYPES.createCourseUseCase).to(CreateCourseUseCase);
    bind<IFindAllCourseUseCase>(TYPES.findAllCourseUseCase).to(FindAllCourseUseCase);
    bind<IUpdateCourseUseCase>(TYPES.updateCourseUseCase).to(UpdateCourseUseCase);
    bind<IStatusCourseUseCase>(TYPES.statusCourseUseCase).to(StatusCourseUseCase);
    bind<IDeleteCourseUseCase>(TYPES.deleteCourseUseCase).to(DeleteCourseUseCase);
    bind<IFindCourseById>(TYPES.findCourseById).to(FindCourseById);

    //documentation
    bind<HelpCenterController>(TYPES.helpCenterController).to(HelpCenterController);
    bind<IFindHelpCenterUseCase>(TYPES.findHelpCenterUseCase).to(FindHelpCenterUseCase);
    bind<IFindHelpCenterByIDUseCase>(TYPES.findHelpCenterByIdUseCase).to(FindHelpCenterByIDUseCase);

    //Languages
    bind<LanguagesController>(TYPES.languagesController).to(LanguagesController);
    bind<IFindLanguagesUseCase>(TYPES.findLanguagesUseCase).to(FindLanguagesUseCase);
    bind<IFindLanguagesEnableUseCase>(TYPES.findLanguagesEnableUseCase).to(FindLanguagesEnableUseCase);
    bind<IChangeStatusLanguageUseCase>(TYPES.changeStatusLanguageUseCase).to(ChangeStatusLanguageUseCase);

    //Charges
    bind<ChargeController>(TYPES.chargesController).to(ChargeController);
    bind<IFindChargesByOrganizationUseCase>(TYPES.findChargesByOrganizationUseCase).to(FindChargesByOrganizationUseCase)

    //Repositorys 
    bind<IOrganizationRepository>(TYPES.organizationRepository).to(OrganizationRepository);
    bind<LanguageRepository>(TYPES.languageRepository).to(LanguageRepository);
    bind<IStatusOrganizationRepository>(TYPES.statusOrganizationRepository).to(StatusOrganizationRepository)
    bind<IUserRepository>(TYPES.userRepository).to(UserRepository);
    bind<IAdrressRepository>(TYPES.addressRepository).to(AddressRepository);
    bind<IHelpCenterRepository>(TYPES.helpeCenterRepository).to(HelpCenterRepository);
    bind<IChargeRepository>(TYPES.chargesRepository).to(ChargeRepository);
    bind<ILanguageOrganizationRepository>(TYPES.languageOrganizationRepository).to(LanguageOrganizationRepository);
    bind<ICourseRepository>(TYPES.courseRepository).to(CourseRepository);

    // Util
    bind<Validators>(TYPES.validators).to(Validators);
    bind<TokenUtil>(TYPES.tokenUtil).to(TokenUtil);
    bind<MailFactory>(TYPES.mailFactory).to(MailFactory);

    // Provider
    bind<IMailProvider>(TYPES.nodemailerProvider).to(NodemailerProvider);

    let messageProvider: IMessageProvider = new KafkaMessageProvider();
    bind<IMessageProvider>(TYPES.IMessageProvider).toConstantValue(messageProvider);

    bind<AlarmMessageTransport>(TYPES.AlarmMessageTransport).to(AlarmMessageTransport);

    //Builder
    bind<IUserBuilder>(TYPES.userBuilder).to(UserBuilder);
});
