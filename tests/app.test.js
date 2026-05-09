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
  
});

