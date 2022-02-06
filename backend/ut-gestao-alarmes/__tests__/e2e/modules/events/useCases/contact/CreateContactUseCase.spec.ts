import ContactRequestDTO from "../../../../../../src/modules/events/dtos/ContactRequestDTO";

describe("CreateContactUseCase.spec", () => {

  it("should create an contact with all informations", async () => {
    const contact = new ContactRequestDTO();
    contact.userId = -1;
    contact.organizationId = null;
    contact.email = 'email@email.com';
    contact.phone = '+5527999999999';
    contact.actions = [1, 2];

    const createResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createResponse.status).toBe(201);

    const deleteResponse = await global.testRequest
      .delete(`/v1/contact/delete/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });

  it("should create an contact with only the necessary informations", async () => {
    const contact = new ContactRequestDTO();
    contact.userId = -2;
    contact.email = 'email@email.com';

    const createResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createResponse.status).toBe(201);

    const deleteResponse = await global.testRequest
      .delete(`/v1/contact/delete/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });

  it("should receive an 404 error when trying to create an contact with an actionId that does not exists", async () => {
    const contact = new ContactRequestDTO();
    contact.userId = -3;
    contact.email = 'email@email.com';
    contact.actions = [3];

    const createResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createResponse.status).toBe(404);
  });

  it("should receive an 409 error when trying to create an contact with an userId that already exists", async () => {
    const contact = new ContactRequestDTO();
    contact.userId = -4;
    contact.email = 'email@email.com';

    const createResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createResponse.status).toBe(201);

    const createAgainResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createAgainResponse.status).toBe(409);

    const deleteResponse = await global.testRequest
      .delete(`/v1/contact/delete/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);

  });
});