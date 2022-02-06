import Mail from "./dtos/Mail";
import Mustache from "mustache";
import fs from "fs";

export interface SendMailProps {
  email: string | string[];
  name: string;
  description: string;
}

class MailFactory {

  constructor() {
  }

  factorySendAlert({ email, description, name }: SendMailProps): Mail {
    let mail = new Mail(email, 'Nova notificação');
    let descriptionAsHtml = Mustache.render(description, {});
    let variables = {
      name,
      description: descriptionAsHtml
    }

    let plainDescription = description
      .replace(/<span>/ig, '')
      .replace(/<\/span>/ig, '')
      .replace(/<strong>/ig, '')
      .replace(/<\/strong>/ig, '');

    const options = {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short',
      timeStyle: 'medium',
    }

    mail.message = Mustache.render(fs.readFileSync('src/modules/events/templates/alarm-email.html', 'utf8'), variables);
    mail.subject = `${name.toUpperCase()} ${new Date(Date.now()).toLocaleString('pt-br', options)}`.toUpperCase();
    mail.text = `${name.toUpperCase()}: ${plainDescription}`;

    return mail;
  }
}

export default new MailFactory();