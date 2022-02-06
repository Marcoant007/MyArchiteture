import { Pagination } from "@database/Pagination";
import IHelpCenterRepository from "@repositories/helpCenter/IHelpCenterRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import HelpPagesDTO from "src/main/dto/HelpPagesDTO";
import IFindHelpCenterUseCase from "./IFindHelpCenterUseCase";

@injectable()
class FindHelpCenterUseCase implements IFindHelpCenterUseCase {
    constructor(
        @inject(TYPES.helpeCenterRepository)
        private readonly helpCenterRepository: IHelpCenterRepository) { }

    public async execute(profile, language, page, limit): Promise<{ helpCenter: HelpPagesDTO[], count: number }> {
        const pagination = new Pagination(limit,page);
        this.helpCenterRepository.setPagination(pagination);
        const helpCenterResult = await this.helpCenterRepository.find(profile, language);
        if(helpCenterResult.isLeft()) {
            // throw "Filho da puta disgraçado!!!";
        }
        const {helpDB, count} =  helpCenterResult.right();
        const helpCenter = helpDB.map(help => new HelpPagesDTO(help));
        const response = {helpCenter, count};
        return response     
    }
}

export default FindHelpCenterUseCase