import HelpPagesDTO from "src/main/dto/HelpPagesDTO";

export default interface IFindHelpCenterUseCase {
    execute(profile, language, page, limit): Promise<{ helpCenter: HelpPagesDTO[], count: number }>
}