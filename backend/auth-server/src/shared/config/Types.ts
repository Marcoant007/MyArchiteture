const TYPES = {
    // Auth User
    userRepository: Symbol.for("UserRepository"),
    addressRepository: Symbol.for("AddressRepository"),
    helpeCenterRepository: Symbol.for("HelpeCenterRepository"),
    loginUseCase: Symbol.for("LoginUseCase"),
    createOrganizationUserUseCase: Symbol.for("CreateUserOrganizationUseCase"),
    createUserUseCase: Symbol.for("CreateUserUseCase"),
    authController: Symbol.for("AuthController"),
    userController: Symbol.for("UserController"),
    helpCenterController: Symbol.for("HelpCenterController"),
    retriveAcessController: Symbol.for("RetriveAcessController"),
    generateTokenUseCase: Symbol.for("GenerateTokenUseCase"),
    recoveryAccess: Symbol.for("RecoveryAccess"),
    recoverUserEmailUseCase: Symbol.for("RecoverUserEmailUseCase"),
    resetPasswordUseCase: Symbol.for("ResetPasswordUseCase"),
    findUserUseCase: Symbol.for("FindUserUseCase"),
    validateRegisterTokenUseCase: Symbol.for("ValidateRegisterTokenUseCase"),
    findUserTypesUseCase: Symbol.for("FindUserTypesUseCase"),
    findHelpCenterUseCase: Symbol.for("FindHelpCenterUseCase"),
    findHelpCenterByIdUseCase: Symbol.for("FindHelpCenterByIDUseCase"),
    findUserByIdUseCase: Symbol.for("FindUserByIdUseCase"),
    findUsersByOrganizationUseCase: Symbol.for("FindUserByOrganizationUseCase"),
    importUserUseCase: Symbol.for("ImportUserUseCase"),

    updatedUserUseCase: Symbol.for("UpdatedUserUseCase"),
    configUserUseCase: Symbol.for("ConfigUserUseCase"),
    statusUserUseCase: Symbol.for("StatusUserUseCase"),
    deleteUserUseCase: Symbol.for("DeleteUserUseCase"),

    // Instituition Admin Register
    organizationRepository: Symbol.for("OrganizationRepository"),
    registerInstituitionAndAdminUseCase: Symbol.for("RegisterInstituitionAndAdminUseCase"),
    instituitionAndAdminController: Symbol.for("InstituitionAndAdminController"),
    statusOrganizationRepository: Symbol.for("StatusOrganizationRepository"),
    findInstituitionUsecase: Symbol.for("FindInstituitionUseCase"),
    deleteInstituitionUseCase: Symbol.for("DeleteInstituitionUseCase"),
    findByIdInstituitionUseCase: Symbol.for("FindInstituitionByIdUseCase"),
    updateInstitutionUseCase: Symbol.for("UpdateInstitutionUseCase"),
    uploadImageOrganization: Symbol.for("UploadImageOrganization"),

    // Languages
    languagesController: Symbol.for("LanguagesController"),
    findLanguagesUseCase: Symbol.for("FindLanguagesUseCase"),
    findLanguagesEnableUseCase: Symbol.for("FindLanguagesEnableUseCase"),
    languageRepository: Symbol.for("LanguageRepository"),
    languageOrganizationRepository: Symbol.for("LanguageOrganizationRepository"),
    changeStatusLanguageUseCase: Symbol.for("ChangeStatusLanguageUseCase"),

    // Charges
    chargesController: Symbol.for("ChargeController"),
    chargesRepository: Symbol.for("ChargesRepository"),
    findChargesByOrganizationUseCase: Symbol.for("FindChargesByOrganizationUseCase"),

    //Plan
    planController: Symbol.for("PlanController"),
    createPlanUseCase: Symbol.for("CreatePlanUseCase"),
    planRepository: Symbol.for("PlanRepository"),
    findPlanUseCase: Symbol.for("FindPlanUseCase"),
    findPlanByIdUseCase: Symbol.for("FindPlanByIdUseCase"),
    statusPlanUseCase: Symbol.for("StatusPlanUseCase"),
    updatePlanUseCase: Symbol.for("UpdatePlanUseCase"),
    deletePlanUseCase: Symbol.for("DeletePlanUseCase"),

    //Course
    courseRepository: Symbol.for("CourseRepository"),
    courseController: Symbol.for("CourseController"),
    createCourseUseCase: Symbol.for("CreateCourseUseCase"),
    findAllCourseUseCase: Symbol.for("FindAllCourseUseCase"),
    updateCourseUseCase: Symbol.for("UpdateCourseUseCase"),
    statusCourseUseCase: Symbol.for("StatusCourseUseCase"),
    deleteCourseUseCase: Symbol.for("DeleteCourseUseCase"),
    findCourseById: Symbol.for("FindCourseById"),

    //Class
    classController: Symbol.for("ClassController"),
    classRepository: Symbol.for("ClassRepository"),
    createClassUseCase: Symbol.for("CreateClasseUseCase"),
    findClassUseCase: Symbol.for("FindClassUseCase"),
    updateClassUseCase: Symbol.for("UpdateClassUseCase"),
    findClassByIdUseCase: Symbol.for("FindClassByIdUseCase"),
    deleteClassUseCase: Symbol.for("DeleteClassUseCase"),

    //middlewares
    multerMiddleware: Symbol.for("MulterMiddleware"),

    //util
    validators: Symbol.for("Validators"),
    tokenUtil: Symbol.for("TokenUtil"),
    mailFactory: Symbol.for("MailFactory"),

    // provider
    nodemailerProvider: Symbol.for("NodemailerProvider"),

    //builder
    userBuilder: Symbol.for("UserBuilder"),
    IMessageProvider: Symbol.for("IMessageProvider"),
    AlarmMessageTransport: Symbol.for("AlarmMessageTransport"),


};

export default TYPES;