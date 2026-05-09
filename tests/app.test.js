const request = require("supertest");
const app = require("../src/app");


describe("App.js endpoints", () => {
  it("GET / returns Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello World");
  });


  it("POST /login returns token", async () => {
    const res = await request(app)
      .post("/login")
      .send({ user: "demo" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  //skipping eval endpoint test since it's my create test error


  // -------------- AFTER CORRECTING THE EVAL ENDPOINT --------------
  //after correcting the eval endpoint, now added a test for the eval endpoint 
  it("GET /eval with 2+2 returns 4", async () => {
    const res = await request(app).get("/eval?code=2%2B2");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("4");
  });

  it("GET /eval with invalid code returns 400", async () => {
    const res = await request(app).get("/eval?code=bad");
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Invalid code");
  });
});

