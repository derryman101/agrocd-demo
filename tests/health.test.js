const request = require("supertest");
const app = require("../src/app");

describe("Health endpoint", () => {
  test("GET /health returns status and version", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      version: "1.2.0"
    });
  });
});
