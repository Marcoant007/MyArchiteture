import { Language } from "@models/Language";
import ILanguageRepository from "@repositories/languages/ILanguagesRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import IFindLanguagesUseCase from "./IFindLanguagesUseCase";

@injectable()
class FindLanguagesUseCase implements IFindLanguagesUseCase {
    constructor(
        @inject(TYPES.languageRepository)
        private readonly languageRepository: ILanguageRepository
    ) { }

    async execute(): Promise<Language[]> {
        const response = await this.languageRepository.find();
        const languagesDb = response.right();
        return languagesDb;
    }
}

export default FindLanguagesUseCase;