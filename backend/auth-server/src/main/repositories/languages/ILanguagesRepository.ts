import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Language } from "@models/Language";

export default interface ILanguageRepository {
    find(): Promise<Either<Failure, Language[]>>
    findLanguagesEnable(): Promise<Either<Failure, Language[]>>
    changeStatusLanguage(id: number, language: Language): Promise<Either<Failure, Boolean>>
    findLanguageById(id: number): Promise<Either<Failure, Language>>
}