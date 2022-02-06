import nodemailer from 'nodemailer';
import config from '../../../config/config';
import Pino from '../../../util/Pino';
import Mail from '../dtos/Mail';
import IMailProvider from './IMailProvider'

export default class NodemailerProvider implements IMailProvider {

  public async send(mail: Mail) {
    return new Promise((resolve, _) => {
      const transporter = nodemailer.createTransport(
        (config.mailConfig),
      );

      transporter.sendMail({
        subject: mail.subject,
        from: mail.from,
        to: mail.to,
        html: mail.message,
        text: mail.text
      }, function (error, info) {
        if (error) {
          Pino.error("error is " + error);
          resolve(false);
        }
        else {
          Pino.info('Email sent: ' + info.response);
          resolve(true);
        }
      });
    });
  }
}