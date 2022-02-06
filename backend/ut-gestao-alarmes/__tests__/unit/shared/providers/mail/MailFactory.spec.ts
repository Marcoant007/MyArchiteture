import MailFactory from '../../../../../src/shared/providers/mail/MailFactory';

describe('MailFactory.spec', () => {
  it('should build an email to send an alert', () => {
    const mail = MailFactory.factorySendAlert({
      email: 'qapyj@vomoto.com',
      name: 'debug',
      description: 'testeeee',
    });

    expect(mail.subject).toContain('ALARME TESTE EMAIL - DEBUG');

    expect(mail.to).toEqual('qapyj@vomoto.com');

    expect(mail.from).toEqual('Novo Alarme');

    expect(mail.text).toContain(`ALARME TESTE EMAIL - DEBUG: testeeee`)
  });
})