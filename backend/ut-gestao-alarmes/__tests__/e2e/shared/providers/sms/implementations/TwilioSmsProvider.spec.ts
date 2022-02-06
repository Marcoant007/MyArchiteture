import SmsFactory from '../../../../../../src/shared/providers/sms/SmsFactory';
import TwilioSmsProvider from '../../../../../../src/shared/providers/sms/implementations/TwilioSmsProvider';
import config from '../../../../../../src/shared/config/config'

describe("TwilioSmsProvider.spec", () => {
  it("should send an test email", async () => {
    const mailService = new TwilioSmsProvider();

    const sms = SmsFactory.factorySendAlert({
      to: '+5527998039374',
      from: config.twilio.phoneNumber,
      body: 'FUNCIONOU ESSE COISO'
    });

    await mailService.send(sms);
  });

});