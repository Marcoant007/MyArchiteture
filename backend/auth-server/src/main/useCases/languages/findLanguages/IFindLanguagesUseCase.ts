import { Language } from "@models/Language"

export default interface IFindLanguagesUseCase {
    execute(): Promise<Language[] | undefined>;
}