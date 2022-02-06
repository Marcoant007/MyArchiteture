import sgMail from '@sendgrid/mail';
import config from '../../../config/config';
import Pino from '../../../util/Pino';
import Mail from '../dtos/Mail';
import IMailProvider from './IMailProvider'

export default class SendGridProvider implements IMailProvider {

  public async send(mail: Mail) {
    return new Promise((resolve, _) => {
      sgMail.setApiKey(config.sendGrid.apiKey);

      sgMail.send({
        to: mail.to,
        from: config.sendGrid.fromEmail,
        subject: mail.subject,
        html: mail.message,
        text: mail.text
      })
        .then(() => {
          Pino.info('Email sent');
          resolve(true);
        })
        .catch((error) => {
          Pino.error(error)
          resolve(false);
        });
    });

    Pino.info(mail);
  }
}