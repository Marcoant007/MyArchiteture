import Sms from '../dtos/Sms';

export default interface ISmsProvider {
  sanitizer();
  countryCode();
  setMessage(message: Sms);
  send(): void;
}