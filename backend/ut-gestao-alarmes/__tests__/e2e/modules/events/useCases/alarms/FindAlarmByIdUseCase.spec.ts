import AlarmRequestDTO from "../../../../../../src/modules/events/dtos/AlarmRequestDTO";
import EventRequestDTO from "../../../../../../src/modules/events/dtos/EventRequestDTO";

describe("FindAlarmByIdUseCase.spec", () => {

  it("should find an alarm created", async () => {
    const event = new EventRequestDTO();
    event.name = 'Teste encontrar alarme por id';
    event.category = 'tap';
    event.origin = 'Teste';
    event.level = 'debug';
    event.userId = 1;

    event.description = 'Chope da torneira <span>Jardim da Penha - 01:</span> <strong>ACABOU</strong>';

    const alarm = new AlarmRequestDTO();
    alarm.event = event;

    const createResponse = await global.testRequest
      .post(`/v1/alarm/create`)
      .send(alarm);

    expect(createResponse.status).toBe(201);

    const findResponse = await global.testRequest
      .get(`/v1/alarm/find-one/${createResponse.body.id}`);

    expect(findResponse.status).toBe(200);
  });

  it("should receive an 404 error when trying to find an alarm whith an id that does not exists", async () => {
    const findResponse = await global.testRequest
      .get(`/v1/alarm/find-one/1000000`);

    expect(findResponse.status).toBe(404);
  });
});