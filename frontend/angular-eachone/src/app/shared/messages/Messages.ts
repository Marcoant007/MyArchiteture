import { SnackMessageEnum } from "../Enum/SnackMessageEnum";
import { SnackbarMessage } from "./MessagesClass";

export class Messages {

    public static invalidForm = new SnackbarMessage(
        true,
        SnackMessageEnum.error,
        'Formulário Inválido, verifique os dados!',
        'Error'
    )

    public static blockForm = new SnackbarMessage(
        true,
        SnackMessageEnum.error,
        'Formulário Bloqueado! Habilite a edição para continuar.',
        'Error'
    )

    public static successCreateUser = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Usuário cadastrado com sucesso!',
        'Sucesso'
    )

    public static successCreateInstitutions = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Instituição cadastrada com sucesso!',
        'Sucesso'
    )

    public static successUpdateInstitutions = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Instituição atualizada com sucesso!',
        'Sucesso'
    )

    public static institutionsDisabledSuccess = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Instituição desabilitada com sucesso!',
        'Sucesso'
    )

    public static successUpdateUser = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Usuário atualizado com sucesso!',
        'Sucesso'
    )

    public static deleteUserSuccess = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Usuário deletado com sucesso!',
        'Sucesso'
    )

    public static errorLogin = new SnackbarMessage(
        true,
        SnackMessageEnum.error,
        'Erro ao efetuar login!',
        'Error'
    )

    public static successConfigUserProfile = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Perfil do usuário configurado com sucesso!',
        'Sucesso'
    )

    public static successCreatePlan = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Plano Criado com sucesso!',
        'Sucesso'
    )

    public static successUpdatePlan = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Plano Atualizado com sucesso!',
        'Sucesso'
    )

    public static successDisablePlan = new SnackbarMessage(
        true,
        SnackMessageEnum.success,
        'Plano Deletado com sucesso!',
        'Sucesso'
    )
}
