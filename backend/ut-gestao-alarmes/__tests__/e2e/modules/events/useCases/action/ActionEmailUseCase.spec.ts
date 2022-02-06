import ActionEmailUseCase from '../../../../../../src/modules/events/useCases/action/ActionEmailUseCase';

describe("ActionEmailUseCase.spec", () => {
  it("should send an test email", async () => {
    const event = {
      category: 'debug',
      origin: 'Teste email',
      description: 'Chope da torneira <span>Jardim da Penha - 01:</span> <strong>ACABOU</strong>',
      createdAt: new Date(Date.now()).toLocaleString(),
      name: 'Teste',
      userId: 1,
      level: 'q',
      organizationId: null
    }

    const contact = {
      email: 'email@email.com',
      userId: 1,
    }

    const actionUseCase = new ActionEmailUseCase();

    actionUseCase.execute({ alarmEvent: event, contact });
  });

});