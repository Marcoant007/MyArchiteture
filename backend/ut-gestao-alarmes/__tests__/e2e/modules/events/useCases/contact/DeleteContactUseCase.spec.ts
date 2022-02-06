import ContactRequestDTO from "../../../../../../src/modules/events/dtos/ContactRequestDTO";

describe("DeleteContactUseCase.spec", () => {

  it("should delete a contact", async () => {
    const contact = new ContactRequestDTO();
    contact.userId = -5;
    contact.email = 'email@email.com';

    const createResponse = await global.testRequest
      .post(`/v1/contact/create`)
      .send(contact);

    expect(createResponse.status).toBe(201);

    const deleteResponse = await global.testRequest
      .delete(`/v1/contact/delete/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });

  it("should receive an 404 error when trying to delete a contact whith an id that does not exists", async () => {
    const deleteResponse = await global.testRequest
      .delete(`/v1/contact/delete/${1000}`);

    expect(deleteResponse.status).toBe(404);
  });
});