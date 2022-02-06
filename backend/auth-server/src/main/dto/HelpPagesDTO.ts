import { HelpPages } from "@models/HelpPages";

export default class HelpPagesDTO {
    id: number;
    title: string;
    filename: string;
    code: string;
    language_id: number

    constructor(help: HelpPages){
        //this.id = help.id;
        this.title = help.title;
        this.filename = help.filename;
        this.code = help.code;
        //this.language_id = help.languageId
    }
}