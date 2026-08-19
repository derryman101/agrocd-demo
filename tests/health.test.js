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

describe("Dashboard", () => {
  test("GET / returns the application dashboard", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/text\/html/);
    expect(response.text).toContain("AgroCD Demo");
    expect(response.text).toContain("CI/CD + GitOps learning application");
  });
});

describe("Application info endpoint", () => {
  test("GET /api/info returns application information", async () => {
    const response = await request(app).get("/api/info");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      application: "agrocd-demo",
      status: "ok",
      version: "1.2.0",
      environment: "Local",
      gitSha: "development",
      platform: "nodejs"
    });
  });
});

describe("Unknown routes", () => {
  test("GET /unknown returns 404", async () => {
    const response = await request(app).get("/unknown");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      error: "Not Found"
    });
  });
});
