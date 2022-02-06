export default class Mail {
    subject: string;
    from: string;
    to: string;
    message: string;

    constructor(to: string, from: string) {
        this.to = to;
        this.from = from;
    }
}