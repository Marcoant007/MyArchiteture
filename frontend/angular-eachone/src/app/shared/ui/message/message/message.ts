export class Message {
  title?: string;
  message: string;
  submessage?: string
  width?: string
  disableClose?: boolean;

  constructor({ title, message, submessage, width = '40%', disableClose = true }: Message) {
    this.title = title;
    this.message = message;
    this.submessage = submessage;
    this.width = width;
    this.disableClose = disableClose;
  }
}
