import ISmsProvider from './ISmsProvider';
import config from '../../../config/config';
import Pino from '../../../util/Pino';
import Sms from '../dtos/Sms';
import axios from 'axios';

export class SmsEmpresa {
  key: string;
  type = 9;
  number: string;
  msg: string;

  constructor(sms: Sms) {
    this.number = sms.to;
    this.msg = sms.body;
  }
}

export default class SmsEmpresaProvider implements ISmsProvider {
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
    return this;
  }

  public async send() {
    Pino.info(`Enviado sms pelo SMS Empresa`);
    const sms = new SmsEmpresa(this.message);
    sms.key = config.smsEmpresa.apiKey;
    
    axios.post('https://api.smsempresa.com.br/v1/send', sms)
    .then(function (response) {
      Pino.info(`Sms enviado com sucesso para: ${sms.number} - ${response}`);
    })
    .catch(function (error) {
      Pino.error(`Erro ao enviar o sms: ${error}`);
      Pino.error(error);
    });

    return null;
  }
}