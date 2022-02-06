import { Language } from "@models/Language";
import ILanguageRepository from "@repositories/languages/ILanguagesRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IChangeStatusLanguageUseCase from "./IChangeStatusLanguageUseCase";

@injectable()
export default class ChangeStatusLanguageUseCase implements IChangeStatusLanguageUseCase {
    constructor(
        @inject(TYPES.languageRepository)
        private readonly languageRepository: ILanguageRepository
    ) { }

    async execute(id: number, status: boolean): Promise<Language> {
        try {
            let resultDb = await this.languageRepository.findLanguageById(id);
            let languageDb = resultDb.right();
            languageDb.enable = status;

            await this.languageRepository.changeStatusLanguage(id, languageDb);

            return languageDb
        } catch (error) {
            return error
        }
    }
}