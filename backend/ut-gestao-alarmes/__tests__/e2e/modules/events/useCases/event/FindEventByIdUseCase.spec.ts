import EventRequestDTO from "../../../../../../src/modules/events/dtos/EventRequestDTO";

describe("FindEventByIdUseCase.spec", () => {

  it("should find an event created", async () => {
    const event = new EventRequestDTO();
    event.name = 'Teste encontrar evento por id';
    event.category = 'debug';
    event.origin = 'Teste';
    event.level = 'debug';
    event.userId = 1;
    event.description = 'Chope da torneira <span>Jardim Camburi - 01:</span> <strong>ACABOU</strong>';

    const createResponse = await global.testRequest
      .post(`/v1/event/create`)
      .send(event);

    expect(createResponse.status).toBe(201);

    const findResponse = await global.testRequest
      .get(`/v1/event/find-one/${createResponse.body.id}`);

    expect(findResponse.status).toBe(200);
  });

  it("should receive an 404 error when trying to find an event whith an id that does not exists", async () => {
    const findResponse = await global.testRequest
      .get(`/v1/event/find-one/1000000`);

    expect(findResponse.status).toBe(404);
  });
});