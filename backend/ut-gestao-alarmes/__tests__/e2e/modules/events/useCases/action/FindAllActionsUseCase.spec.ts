describe("FindAllActionsUseCase.spec", () => {
  it("should find all actions", async () => {
    const response = await global.testRequest
      .get(`/v1/action/find-all`);

    expect(response.status).toBe(200);
  });
});