import ContactRequestDTO from "../../../../../../src/modules/events/dtos/ContactRequestDTO";

describe("FindContactById.spec", () => {

  it("should find a contact", async () => {
    const contact = new ContactRequestDTO();
    contact.userId = -6;
    contact.email = 'email@email.com';

    const createResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createResponse.status).toBe(201);

    const findResponse = await global.testRequest
      .get(`/v1/contact/find-one/${createResponse.body.id}`);

    expect(findResponse.status).toBe(200);

    const deleteResponse = await global.testRequest
      .delete(`/v1/contact/delete/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });

  it("should receive an 404 error when trying to find a contact whith an id that does not exists", async () => {
    const findResponse = await global.testRequest
      .get(`/v1/contact/find-one/1000000`);

    expect(findResponse.status).toBe(404);
  });
});