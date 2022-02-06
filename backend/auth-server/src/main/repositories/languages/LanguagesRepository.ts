import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { Language } from "@models/Language";
import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import ILanguageRepository from "./ILanguagesRepository";

@injectable()
class LanguageRepository implements ILanguageRepository {
    private ormRepository: Repository<Language>;

    constructor() {
        this.ormRepository = getRepository(Language);
    }

    async find(): Promise<Either<Failure, Language[]>> {
        try {
            let languagesDb = await this.ormRepository.createQueryBuilder("language")
                .getMany();
            return Either.right(languagesDb);
        } catch (error) {
            return Either.left(error.message);
        }
    }

    async findLanguagesEnable(): Promise<Either<Failure, Language[]>> {
        try {
            let languagesDb = await this.ormRepository.createQueryBuilder("language")
                .where("language.enable = :enable", { enable: true })
                .getMany();

            return Either.right(languagesDb)
        } catch (error) {
            return Either.left(error.message)
        }
    }

    async changeStatusLanguage(id: number, language: Language): Promise<Either<Failure, Boolean>> {
        try {
            let result = await this.ormRepository.update(id, language)

            return Either.right(true)
        } catch (error) {
            return Either.left(error.message)
        }
    }

    async findLanguageById(id: number): Promise<Either<Failure, Language>> {
        try {
            let languageDb = await this.ormRepository.createQueryBuilder("language")
                .where("language.id = :id", { id: id })
                .getOne();

            return Either.right(languageDb)
        } catch (error) {
            return Either.left(error.message)
        }
    }
}

export default LanguageRepository;