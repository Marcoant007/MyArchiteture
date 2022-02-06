import ContactRequestDTO from "../../../../../../src/modules/events/dtos/ContactRequestDTO";

describe("FindContactByUserIdUseCase.spec", () => {

  it("should find a contact", async () => {
    const contact = new ContactRequestDTO();
    contact.userId = -7;
    contact.email = 'email@email.com';

    const createResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createResponse.status).toBe(201);

    const findResponse = await global.testRequest
      .get(`/v1/contact/find-user/${contact.userId}`);

    expect(findResponse.status).toBe(200);

    const deleteResponse = await global.testRequest
      .delete(`/v1/contact/delete/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });
});