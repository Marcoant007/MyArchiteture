describe("FindAllContactsByFiltersPaged.spec", () => {

  it("should find all contacts created with filters", async () => {
    const findResponse = await global.testRequest
      .get(`/v1/contact/find-all?organization=1&page=1&limit=1`);

    expect(findResponse.status).toBe(200);
  });

  it("should find all contacts even without filters", async () => {
    const findResponse = await global.testRequest
      .get(`/v1/contact/find-all?`);

    expect(findResponse.status).toBe(200);
  });
});