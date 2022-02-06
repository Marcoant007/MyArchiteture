import Mail from "./Mail";

export default interface IMailProvider {
  send(mail: Mail);
}