import Either from "@config/Either";
import { Pagination } from "@database/Pagination";
import { Failure } from "@errors/Failure";
import { HelpPages } from "@models/HelpPages";
import { injectable } from "inversify";
import HelpPagesDTO from "src/main/dto/HelpPagesDTO";
import { getRepository, Repository } from "typeorm";
import IHelpCenterRepository from "./IHelpCenterRepository";

@injectable()
class HelpCenterRepository implements IHelpCenterRepository {

    private ormRepository: Repository<HelpPages>;
    private pagination: Pagination;

    constructor() {
        this.ormRepository = getRepository(HelpPages);
    }

    public setPagination(pagination: Pagination) {
        this.pagination = pagination;
    }

    async find(profile: string, language: string): Promise<Either<Failure, { helpDB: HelpPages[], count: number } | undefined>> {
        try {
            const offset = this.pagination.offset();
            const limit = this.pagination.limit();
            let query = this.ormRepository.createQueryBuilder("HelpPages")
                .leftJoinAndSelect("HelpPages.language", "language")
                .leftJoinAndSelect("HelpPages.helpHasProfiles", "helpHasProfiles")
                .leftJoinAndSelect("helpHasProfiles.profile", "profile")
                .limit(limit)
                .offset(offset)
                if(profile){
                    query.where("profile.name ilike :profile_name", { profile_name: `%${profile}%` })
                }
                if(language){
                    query.andWhere("language.name ilike :language_name", { language_name: `%${language}%` })
                }
                
            const [helpDB, count] = await query.getManyAndCount();
            return Either.right({ helpDB, count });
        } catch (error) {
            console.log(error.message)
            return Either.left(error.message);
        }
    }

    async findByID(id:number):Promise<Either<Failure, HelpPages>>{
        try {
            const helpCenterDB = await this.ormRepository.findOne({where: {id}});
            return Either.right(helpCenterDB);
        } catch (error) {
            return Either.left(error.message);
        }
    }

}

export default HelpCenterRepository