import Sms from "./dtos/Sms";

export interface SendSmsProps {
  to: string;
  from?: string;
  body: string;
}

class SmsFactory {

  constructor() {
  }

  factorySendAlert({ to, from, body }: SendSmsProps): Sms {
    let message = new Sms(to, from, body);

    return message;
  }
}

export default new SmsFactory();