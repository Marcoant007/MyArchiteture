import { HelpPages } from "@models/HelpPages";

export default interface IFindHelpCenterByIDUseCase {
    execute(id:number):Promise<string>
}