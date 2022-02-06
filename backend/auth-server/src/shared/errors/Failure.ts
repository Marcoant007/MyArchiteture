import AppError from "./AppError";

export class Failure {
    // Validation
    public static tokenValidateError = new AppError({
        title: "Ops",
        message: 'Não foi possível buscar token',
        statusCode: 400
    });

    public static tokenMissing = new AppError({
        title: "Ops",
        message: 'Token não existe',
        statusCode: 401
    });


    public static tokenExpiredError = new AppError({
        title: "Validação Expirada",
        message: 'Seu código de acesso está vencido',
        statusCode: 400
    });

    // Password

    public static passwordConfirmationError = new AppError({
        title: "Senhas não compatíveis!",
        message: "Suas senhas não são compatíveis!",
        statusCode: 400
    });

    public static passwordValidateMinEightError = new AppError({
        title: "Erro na validação!",
        message: "A senha deve conter pelo menos 8 caracteres",
        statusCode: 400
    });

    public static passwordValidateBigLetterError = new AppError({
        title: "Erro na validação!",
        message: "A senha deve conter pelo menos uma letra maiúscula",
        statusCode: 400
    });

    public static passwordValidateSmallLetterError = new AppError({
        title: "Erro na validação!",
        message: "A senha deve conter pelo menos uma letra minúscula",
        statusCode: 400
    });


    public static passwordValidateMinNumberError = new AppError({
        title: "Erro na validação!",
        message: "A senha deve conter pelo menos um número",
        statusCode: 400
    });

    public static passwordValidateMinSpecialError = new AppError({
        title: "Erro na validação!",
        message: "A senha deve conter pelo menos um caractere especial",
        statusCode: 400
    });


    // Organization
    public static organizationSaveError = new AppError({
        title: "Erro ao salvar organização",
        message: "Erro ao tentar salvar uma organização"
    });

    public static organizationUpdateError = new AppError({
        title: "Erro ao atualizar organização",
        message: "Erro ao tentar atualizar uma organização"
    });

    public static organizationAlreadyExists = new AppError({
        message: "Nome da instituição ja existe",
        statusCode: 400,
        title: "Erro ao salvar instituição"
    });

    public static organizationNotExist = new AppError({
        message: "Está organização não existe!",
        statusCode: 404,
        title: "Erro ao localizar instituição"
    });

    public static organizationDeleteError = new AppError({
        message: "Essa organização se encontra desabilitada!",
        statusCode: 400,
        title: "Erro ao deletar instituição"
    });

    // Charges

    public static chargeErrorFindByOrganization = new AppError({
        message: "Ocorreu um problema, ao buscar as cobranças de suas respectivas instituições",
        statusCode: 400,
        title: "Error ao buscar as cobranças"
    });

    // User
    public static course = new AppError({
        message: "Esse usuário já existe",
        statusCode: 400,
        title: "Ops! esse usuário já existe"
    });

    public static userNotExists = new AppError({
        message: "Erro ao encontrar usuário",
        statusCode: 400,
        title: "Ops! esse usuário não existe"
    });

    public static userAlreadyDisabled = new AppError({
        message: "Usuário ja está desativado",
        statusCode: 400,
        title: "Ops! Não foi possivel desativar usuário "
    });

    public static userTypeInvalid = new AppError({
        title: "Ops",
        message: 'Tipo de usuário informado não existe',
        statusCode: 400
    });


    public static userNameAlreadyExists = new AppError({
        message: "Nome de usuário já existe",
        statusCode: 400,
        title: "Ops! esse usuário já existe"
    });

    public static userCpfAlreadyExists = new AppError({
        message: "CPF já existe",
        statusCode: 400,
        title: "Ops! esse CPF já existe"
    });

    public static userMandatoryAddress = new AppError({
        message: "Preencha os campos obrigatórios",
        statusCode: 400,
        title: "Ops! Endereço é obrigatório"
    });


    public static userOrPasswordIncorrect = new AppError({
        message: "O e-mail e/ou senha estão incorretos. Por favor, tente novamente.",
        statusCode: 401,
        title: "Erro ao efetuar login"
    });

    public static userGroupOrPermissionNotExists = new AppError({
        message: "Grupo ou permissão não encontrado",
        statusCode: 401,
        title: "Erro ao localizar grupo ou permissão de acesso do usuário"
    });

    public static userBlocked = new AppError({
        message: "Você tentou entrar com a senha errada inumeras vezes, seu login foi bloqueado",
        statusCode: 401,
        title: "Bloqueado"
    });

    public static userEmailNotExists = new AppError({
        message: "E-mail não encontrado em nossa base de dados!",
        statusCode: 404,
        title: "Este e-mail não existe!"
    });

    public static userEmailAlreadyExists = new AppError({
        message: "E-mail ja existe em nossa base de dados!",
        statusCode: 404,
        title: "Este e-mail já existe!"
    });

    public static userCpfOrCodeNoteExists = new AppError({
        message: "CPF ou matrícula, não encotrados na base de dados! Verifique se foram digitados corretamente.",
        statusCode: 404,
        title: "Este CPF/Matrícula não existe!"
    });

    public static emailOrCodeEmpty = new AppError({
        message: "Verifique se os campos foram preenchidos!",
        statusCode: 404,
        title: "Campos vazios!"
    });

    public static userAccoutIsNotActive = new AppError({
        message: "Sua conta de usuário não está ativa",
        statusCode: 401,
        title: "Erro ao efetuar login"
    });

    public static userAccoutIsInstituitionNotActive = new AppError({
        message: "Sua instituição não está ativa",
        statusCode: 401,
        title: "Erro ao efetuar login"
    });

    public static userMailUnconfirmed = new AppError({
        message: "O e-mail não está confirmado, favor confirmar o seu e-mail.",
        statusCode: 401,
        title: "Erro ao efetuar login"
    });

    public static userLoginBlocked = new AppError({
        message: "Você errou inumeras vezes a senha, entre em contato com o admin",
        statusCode: 403,
        title: "Tentativas excedidas"
    });

    public static userErrorFindByOrganization = new AppError({
        message: "Ocorreu um problema, ao buscar usuários de suas respectivas instituições",
        statusCode: 400,
        title: "Error ao buscar usuários"
    });

    public static helpCenterError = new AppError({
        title: "Erro de consulta ",
        statusCode: 400,
        message: "Erro interno no banco de dados"
    });

    public static configUserError = new AppError({
        title: "Erro ao configurar o usuário",
        statusCode: 400,
        message: "Erro ao atualizar as informações de configuração!"
    });

    //TODO REFATORA
    public static AmazonS3Error = new AppError({
        title: "Erro de conexão ",
        statusCode: 400,
        message: "Erro ao fazer conexão com aws"
    });

    //Languages
    public static RelationLanguageOrganizationSaveError = new AppError({
        title: "Erro ao registrar umas da linguages da instituição!",
        statusCode: 400,
        message: "Erro ao salvar relação"
    });



    public static LanguageChangeStatusError = new AppError({
        title: "Erro de alteração!",
        statusCode: 400,
        message: "Erro ao habilitar/desabilitar linguagem!"
    });

    public static PlanAlreadyExists = new AppError({
        title: "Opss, Plano já existe!",
        statusCode: 400,
        message: "Este Plano já existe em nossa base de dados"
    });

    public static ClassCodeAlreadyExist = new AppError({
        title: "Opss, Código já existe!",
        statusCode: 400,
        message: "Já existe um plano cadastro com esse mesmo código!"
    });

    public static ClassNotExist = new AppError({
        title: "Opss, turma não encontrada!",
        statusCode: 400,
        message: "Essa turma não existe em nossa base de dados!"
    });

    public static ClassErrorDelete = new AppError({
        title: "Opss, error ao deletar!",
        statusCode: 400,
        message: "Error ao deletar essa turma!"
    });

    public static ClassErrorUpdate = new AppError({
        title: "Opss, error ao atualizar!",
        statusCode: 400,
        message: "Error ao atualizar essa turma!"
    });

    public static ClassErrorSave = new AppError({
        title: "Opss, Error ao salvar Classe!",
        statusCode: 400,
        message: "Error ao salvar essa turma!"
    });

    public static PlanFindError = new AppError({
        title: "Erro ao procurar este plano!",
        statusCode: 500,
        message: "Problemas para encontrar o plano solicitado"
    });

    public static PlanNotExist = new AppError({
        title: "Opss, Plano não existe!",
        statusCode: 400,
        message: "Este Plano não existe em nossa base de dados"
    });

    public static PlanDeleteError = new AppError({
        title: "Error ao deletar este plano!",
        statusCode: 400,
        message: "Este Plano já se encontra deletado!"
    });

    public static RelationLanguageOrganizationDeleteError = new AppError({
        title: "Erro ao deletar umas da linguages da instituição!",
        statusCode: 400,
        message: "Erro ao deletar relação"
    });
    public static configureHearderOfUserBuilderIsMandatory = new AppError({
        title: "Erro ao tentar importar arquivo",
        message: 'O cabeçalho do arquivo é obrigatório',
        statusCode: 400
    });

    public static userBuilderCantBeBlanckLines = new AppError({
        title: "Erro ao tentar importar arquivo",
        message: 'O arquivo não pode ter linhas em branco',
        statusCode: 400
    });

    // Course 

    public static courseAlreadyExists = new AppError({
        message: "Esse Curso já existe",
        statusCode: 400,
        title: "Ops! esse curso já existe"
    });


    public static courseNotExists = new AppError({
        message: "Esse Curso não existe",
        statusCode: 400,
        title: "Ops! esse curso não existe"
    });

    public static courseNameAlreadyExists = new AppError({
        message: "Nome desse Curso já existe",
        statusCode: 400,
        title: "Ops! o nome desse curso ja existe"
    });


}
