export class MessageModal{
  public title;
  public message;
  public isErrorMessage: boolean;
  public time?:number = 4100;

  constructor(title, message, isErrorMessage, time){
    this.title = title;
    this.message = message;
    this.isErrorMessage = isErrorMessage
    this.time = time
  }
}
