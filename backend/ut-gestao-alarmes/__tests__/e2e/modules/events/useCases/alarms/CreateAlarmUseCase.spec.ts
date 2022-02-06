import EventRequestDTO from "../../../../../../src/modules/events/dtos/EventRequestDTO";
import AlarmRequestDTO from "../../../../../../src/modules/events/dtos/AlarmRequestDTO";

describe("CreateAlarmUseCase.spec", () => {

  it("should create an alarm", async () => {
    const event = new EventRequestDTO();
    event.name = 'Teste criar alarme';
    event.category = 'debug';
    event.origin = 'Teste';
    event.level = 'debug';
    event.userId = 1;

    event.description = 'Chope da torneira <span>Jardim da Penha - 01:</span> <strong>ACABOU</strong>';

    const alarm = new AlarmRequestDTO();
    alarm.event = event;
    alarm.whoCheckedItId = 1;
    alarm.whoSawItId = 1;

    const createResponse = await global.testRequest
      .post(`/v1/alarm/create`)
      .send(alarm);

    expect(createResponse.status).toBe(201);
  });

  it("should receive an 404 error when trying to create an alarm who has an event whith a level that does not exists", async () => {
    const event = new EventRequestDTO();
    event.name = 'Teste criar alarme com erro';
    event.category = 'debug';
    event.origin = 'Teste';
    event.level = 'seila';
    event.userId = 1;

    event.description = 'Chope da torneira <span>Jardim da Penha - 01:</span> <strong>ACABOU</strong>';

    const alarm = new AlarmRequestDTO();
    alarm.event = event;
    alarm.whoCheckedItId = 1;
    alarm.whoSawItId = 1;

    const createResponse = await global.testRequest
      .post(`/v1/alarm/create`)
      .send(alarm);

    expect(createResponse.status).toBe(404);
  });
});