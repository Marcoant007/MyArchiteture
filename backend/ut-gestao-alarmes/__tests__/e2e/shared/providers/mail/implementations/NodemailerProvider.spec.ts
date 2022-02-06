import MailFactory from '../../../../../../src/shared/providers/mail/MailFactory';
import NodemailerProvider from '../../../../../../src/shared/providers/mail/implementations/NodemailerProvider';

describe("NodemailerProvider.spec", () => {
  it("should send an test email", async () => {
    const mailService = new NodemailerProvider();

    const mail = MailFactory.factorySendAlert({
      email: 'qapyj@vomoto.com',
      description: 'testeeee',
      name: 'testeeee',
    });

    await mailService.send(mail);
  });

});