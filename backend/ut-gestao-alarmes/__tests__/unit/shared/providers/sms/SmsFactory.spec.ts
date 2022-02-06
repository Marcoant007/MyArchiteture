import SmsFactory from '../../../../../src/shared/providers/sms/SmsFactory';
import config from '../../../../../src/shared/config/config';

describe('SmsFactory.spec', () => {
  it('should build an sms to send an alert', () => {
    const sms = SmsFactory.factorySendAlert({
      to: '+5527998039374',
      from: config.twilio.phoneNumber,
      body: 'FUNCIONOU ESSE COISO'
    });

    expect(sms.to).toEqual('+5527998039374');

    expect(sms.body).toEqual('FUNCIONOU ESSE COISO');
  });
})