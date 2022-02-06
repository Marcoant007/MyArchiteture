import Config from '@config/Config';
import Pino from '@util/Pino';
import { injectable } from 'inversify';
import nodemailer from 'nodemailer'
import IMailProvider from './IMailProvider';
import Mail from './Mail';

@injectable()
class NodemailerProvider implements IMailProvider {

  public async send(mail: Mail): Promise<boolean> {
    
    return new Promise<boolean>((resolve, reject) => {

      const transporter = nodemailer.createTransport(
        (Config.mailConfig),
      );

      transporter.sendMail({
        subject: mail.subject,
        from: mail.from,
        to: mail.to,
        html: mail.message
      }, function (error, info: any) {
        if (error) {
          Pino.info("error is " + error);
          resolve(false);
        }
        else {
          Pino.info('Email sent: ' + info.response);
          resolve(true);
        }
      });
      transporter.close();

    });
  }
}

export default NodemailerProvider;