import { Language } from "@models/Language";
import ILanguageRepository from "@repositories/languages/ILanguagesRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IFindLanguagesEnableUseCase from "./IFindLanguagesEnableUseCase";

@injectable()
export default class FindLanguagesEnableUseCase implements IFindLanguagesEnableUseCase {
    constructor(
        @inject(TYPES.languageRepository)
        private readonly languageRepository: ILanguageRepository
    ) {
    }

    async execute(): Promise<Language[]> {
        const response = await this.languageRepository.findLanguagesEnable();
        const languagesDb = response.right();
        return languagesDb;
    }
}