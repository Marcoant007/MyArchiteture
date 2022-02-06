import IActionUseCase, { Props } from './IActionUseCase';
import MailFactory from '../../../../shared/providers/mail/MailFactory';
import Mail from '../../../../shared/providers/mail/dtos/Mail'
import NodemailerProvider from '../../../../shared/providers/mail/implementations/NodemailerProvider';
import SendGridProvider from '../../../../shared/providers/mail/implementations/SendGridProvider';
import config from '../../../../shared/config/config';
import Pino from 'src/shared/util/Pino';

export default class ActionEmailUseCase implements IActionUseCase {
  private defaultMailProviders = {
    nodemailer: this.sendFromNodemailer,
    sendgrid: this.sendFromSendGrid
  }

  async execute({ alarmEvent, contactList }: Props): Promise<void> {
    const mail = MailFactory.factorySendAlert({
      email: contactList,
      description: alarmEvent.description,
      name: alarmEvent.name
    });

    await this.defaultMailProviders[config.mailProvider](mail);
  }

  private async sendFromNodemailer(mail: Mail): Promise<void> {
    const mailService = new NodemailerProvider();

    await mailService.send(mail);
  }

  private async sendFromSendGrid(mail: Mail): Promise<void> {
    const mailService = new SendGridProvider();

    await mailService.send(mail);
  }
}