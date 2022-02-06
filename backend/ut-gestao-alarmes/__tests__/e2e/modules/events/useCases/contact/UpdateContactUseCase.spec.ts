import ContactRequestDTO from "../../../../../../src/modules/events/dtos/ContactRequestDTO";

describe("UpdateContactUseCase.spec", () => {

  it("should update an contact with all informations", async () => {
    const contact = new ContactRequestDTO();
    contact.userId = -8;
    contact.organizationId = 1;
    contact.email = 'email@email.com';
    contact.phone = '+5527999999999';
    contact.actions = [1];

    const createResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createResponse.status).toBe(201);

    const contactCreated = createResponse.body;
    contactCreated.email = 'novo@email.com';
    contactCreated.phone = '+5527999999990';
    contactCreated.actions = [];

    const updateResponse = await global.testRequest
      .put(`/v1/contact/update/${createResponse.body.id}`)
      .send(contactCreated);

    expect(updateResponse.status).toBe(200);

    const deleteResponse = await global.testRequest
      .delete(`/v1/contact/delete/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });

  it("should receive an error when trying to update an contact with an actionId that does not exists", async () => {
    const contact = new ContactRequestDTO();
    contact.userId = -9;
    contact.organizationId = 1;
    contact.email = 'email@email.com';
    contact.phone = '+5527999999999';
    contact.actions = [1];

    const createResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createResponse.status).toBe(201);

    const contactCreated = createResponse.body;
    contactCreated.email = 'novo@email.com';
    contactCreated.phone = '+5527999999990';
    contactCreated.actions = [15];

    const updateResponse = await global.testRequest
      .put(`/v1/contact/update/${createResponse.body.id}`)
      .send(contactCreated);

    expect(updateResponse.status).toBe(404);

    const deleteResponse = await global.testRequest
      .delete(`/v1/contact/delete/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });
});