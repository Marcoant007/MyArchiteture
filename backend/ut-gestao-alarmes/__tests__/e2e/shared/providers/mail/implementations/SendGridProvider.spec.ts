import MailFactory from '../../../../../../src/shared/providers/mail/MailFactory';
import SendGridProvider from '../../../../../../src/shared/providers/mail/implementations/SendGridProvider';

describe("SendGridProvider.spec", () => {
  it("should send an test email", async () => {
    const mailService = new SendGridProvider();

    const mail = MailFactory.factorySendAlert({
      email: 'qapyj@vomoto.com',
      description: 'testeeee',
      name: 'testeeee',
    });

    await mailService.send(mail);
  });

});