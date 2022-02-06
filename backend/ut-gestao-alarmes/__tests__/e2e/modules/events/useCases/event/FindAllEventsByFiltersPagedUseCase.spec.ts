describe("FindAllEventsByFiltersPagedUseCase.spec", () => {

  it("should find all events created with filters", async () => {
    const findResponse = await global.testRequest
      .get(`/v1/event/find-all?start=2021-01-17&end=2021-03-17`);

    expect(findResponse.status).toBe(200);
  });

  it("should find all events even without filters", async () => {
    const findResponse = await global.testRequest
      .get(`/v1/event/find-all?`);

    expect(findResponse.status).toBe(200);
  });
});