import { Language } from "@models/Language";

export default interface IFindLanguagesEnableUseCase {
    execute(): Promise<Language[] | undefined>
}