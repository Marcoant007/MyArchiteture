import { SnackMessageEnum } from "../Enum/SnackMessageEnum";


export class SnackbarMessage {
    show: boolean;
    message: string;
    type: SnackMessageEnum;
    title: string;
    timer: number;
    transparent: boolean = false;

    constructor(
        show: boolean,
        type: SnackMessageEnum,
        message: string,
        title: string,
        timer: number = 5000
    ) {
        this.show = show;
        this.type = type;
        this.message = message;
        this.title = title;
        this.timer = timer;
    }
}