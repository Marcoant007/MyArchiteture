import EventRequestDTO from "../../../../../../src/modules/events/dtos/EventRequestDTO";

describe("CreateEventUseCase.spec", () => {

  it("should create an event", async () => {
    const event = new EventRequestDTO();
    event.name = 'Teste criar evento';
    event.category = 'debug';
    event.origin = 'Teste';
    event.level = 'debug';
    event.userId = 1;
    event.description = 'Chope da torneira <span>Jardim Camburi - 01:</span> <strong>ACABOU</strong>';


    const createResponse = await global.testRequest
      .post(`/v1/event/create`)
      .send(event);

    expect(createResponse.status).toBe(201);
  });

  it("should receive an 404 error when trying to create an event whith a level that does not exists", async () => {
    const event = new EventRequestDTO();
    event.name = 'Teste criar evento com erro';
    event.category = 'debug';
    event.origin = 'Teste';
    event.level = 'seila';
    event.userId = 1;
    event.description = 'Chope da torneira <span>Jardim Camburi - 01:</span> <strong>ACABOU</strong>';

    const createResponse = await global.testRequest
      .post(`/v1/event/create`)
      .send(event);

    expect(createResponse.status).toBe(404);
  });
});