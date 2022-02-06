import ActionSMSUseCase from '../../../../../../src/modules/events/useCases/action/ActionSMSUseCase';

describe("ActionSMSUseCase.spec", () => {
  it("should send an test sms", async () => {
    const event = {
      category: 'debug',
      origin: 'Teste sms',
      description: 'Chope da torneira <span>Jardim da Penha - 01:</span> <strong>ACABOU</strong>a',
      createdAt: new Date(Date.now()).toLocaleString(),
      name: 'Teste',
      userId: 1,
      level: 'q',
      organizationId: null
    }

    const contact = {
      email: 'email@email.com',
      userId: 1,
      phone: '+5527999999999'
    }

    const actionUseCase = new ActionSMSUseCase();

    actionUseCase.execute({ alarmEvent: event, contact });
  });

});