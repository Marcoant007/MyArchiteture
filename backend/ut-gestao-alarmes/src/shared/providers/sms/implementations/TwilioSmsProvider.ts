import ISmsProvider from './ISmsProvider';
import client from 'twilio';
import config from '../../../config/config';
import Sms from '../dtos/Sms';

export default class TwilioSmsProvider implements ISmsProvider {
  message: Sms;

  public setMessage(message: Sms): ISmsProvider{
    this.message = message;
    return this;
  }

  public sanitizer(): ISmsProvider {
    this.message.body = this.message.body
      .replace(/<span>/ig, '')
      .replace(/<\/span>/ig, '')
      .replace(/<strong>/ig, '')
      .replace(/<\/strong>/ig, '');

    return this;
  }
  
  public countryCode(): ISmsProvider {
    this.message.to = `+55${this.message.to}`
    return this;
  }

  public async send() {

    this.message.from = config.twilio.phoneNumber;

    const smsClient = client(config.twilio.accountSid, config.twilio.authToken);
    const messageSent = smsClient.messages.create(this.message);

    return messageSent;
  }
}