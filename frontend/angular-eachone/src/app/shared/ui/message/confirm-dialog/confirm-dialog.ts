export class ConfirmDialog {
    title?: string;
    message: string;
    submessage?: string;
    cancelText?: string
    confirmText?: string

    constructor({ title, message, submessage, cancelText = 'Sim', confirmText = 'Não' }: ConfirmDialog) {
        this.title = title;
        this.message = message;
        this.submessage = submessage;
        this.cancelText = cancelText;
        this.confirmText = confirmText;
    }
}
