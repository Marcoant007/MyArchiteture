import Mail from '../dtos/Mail';

export default interface IMailProvider {
  send(mail: Mail): void;
}