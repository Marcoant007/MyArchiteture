import AlarmRequestDTO from "../../../../../../src/modules/events/dtos/AlarmRequestDTO";
import EventRequestDTO from "../../../../../../src/modules/events/dtos/EventRequestDTO";

describe("ChangeWhoCheckedAlarmUseCase.spec", () => {

  it("should check an alarm created", async () => {
    const event = new EventRequestDTO();
    event.name = 'Teste checar alarme';
    event.category = 'debug';
    event.origin = 'Teste';
    event.level = 'debug';
    event.userId = 1;
    event.description = 'Chope da torneira <span>Jardim da Penha - 01:</span> <strong>ACABOU</strong>';

    const alarm = new AlarmRequestDTO();
    alarm.event = event;
    alarm.whoCheckedItId = null;
    alarm.whoSawItId = null;

    const createResponse = await global.testRequest
      .post(`/v1/alarm/create`)
      .send(alarm);

    expect(createResponse.status).toBe(201);

    const checkResponse = await global.testRequest
      .put(`/v1/alarm/check/${createResponse.body.id}`)
      .send({ userId: 1 });

    expect(checkResponse.status).toBe(200);

  });

  it("should receive an 404 error when trying to check an alarm whith an id that does not exists", async () => {
    const checkResponse = await global.testRequest
      .put(`/v1/alarm/check/1000000`)
      .send({ userId: 1 });

    expect(checkResponse.status).toBe(404);
  });

  it("should receive an 400 error when trying to check an alarm already checked", async () => {
    const event = new EventRequestDTO();
    event.name = 'Teste checar alarme com erro';
    event.category = 'debug';
    event.origin = 'Teste';
    event.level = 'debug';
    event.userId = 1;
    event.description = 'Chope da torneira <span>Jardim da Penha - 01:</span> <strong>ACABOU</strong>';

    const alarm = new AlarmRequestDTO();
    alarm.event = event;
    alarm.whoCheckedItId = 1;
    alarm.whoSawItId = null;

    const createResponse = await global.testRequest
      .post(`/v1/alarm/create`)
      .send(alarm);

    expect(createResponse.status).toBe(201);

    const checkResponse = await global.testRequest
      .put(`/v1/alarm/check/${createResponse.body.id}`)
      .send({ userId: 1 });

    expect(checkResponse.status).toBe(400);
  });
});