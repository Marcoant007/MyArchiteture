describe("FindAllalarmsByFiltersPagedUseCase.spec", () => {

  it("should find all alarms created with filters", async () => {
    const findResponse = await global.testRequest
      .get(`/v1/alarm/find-all?checked=all&query=test`);

    expect(findResponse.status).toBe(200);
  });

  it("should find all alarms even without filters", async () => {
    const findResponse = await global.testRequest
      .get(`/v1/alarm/find-all?`);

    expect(findResponse.status).toBe(200);
  });
});