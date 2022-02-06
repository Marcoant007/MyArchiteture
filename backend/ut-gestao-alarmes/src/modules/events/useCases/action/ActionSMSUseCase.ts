import IActionUseCase, { Props } from './IActionUseCase';
import SmsFactory from '../../../../shared/providers/sms/SmsFactory';
import TwilioSmsProvider from '../../../../shared/providers/sms/implementations/TwilioSmsProvider'
import SmsEmpresaProvider from '../../../../shared/providers/sms/implementations/SmsEmpresaProvider'
import Pino from '../../../../shared/util/Pino';
import config from '../../../../shared/config/config';
import ISmsProvider from 'src/shared/providers/sms/implementations/ISmsProvider';

const defaultSmsProvider = {
  twilio: TwilioSmsProvider,
  smsEmpresa: SmsEmpresaProvider,
}

export default class ActionSMSUseCase implements IActionUseCase {
  async execute({ alarmEvent, contactList }: Props): Promise<void> {
    const mailService: ISmsProvider = await new defaultSmsProvider[config.defaultSmsProvider];

    if(!mailService){
      Pino.error(`O provedor ${config.defaultSmsProvider} não existe`);
      throw new Error(`O provedor ${config.defaultSmsProvider} não existe`);
    }    

    const options = {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short',
      timeStyle: 'medium',
    }

    contactList.map(async contact => {
      const sms = SmsFactory.factorySendAlert({
        to: `${contact.replace(/[\(\)\-\s]/g, '')}`,
        body: `${new Date(Date.now()).toLocaleString('pt-br', options)} - ${alarmEvent.name.toUpperCase()}: ${alarmEvent.description}`
      });

      await mailService.setMessage(sms)
      .sanitizer()
      .countryCode()
      .send();
    });

  }
}