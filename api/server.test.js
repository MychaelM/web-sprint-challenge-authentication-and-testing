const supertest = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

// test('sanity', () => {
//   expect(true).toBe(false)
// })

describe("tests auth integration", () => {
  it("successfully registers new user", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({
        username: "test",
        password: "abc123"
      })

      // console.log(res)

      expect(res.statusCode).toBe(201)
      expect(res.type).toBe("application/json")
      expect(res.body.username).toBe("test")
  })

  it("sends missing password data on register", async () => {
    const res = await supertest(server).post("/api/auth/register").send({
      username: "test",
    });

    expect(res.statusCode).toBe(401);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toBe("username and password required");
  })

  it("sends missing username data on register", async () => {
    const res = await supertest(server).post("/api/auth/register").send({
      password: "test",
    });

    expect(res.statusCode).toBe(401);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toBe("username and password required");
  })

  it("successfully logs in", async () => {
    const res = await supertest(server).post("/api/auth/register").send({
      username: "test",
      password: "abc123",
    });
    const res2 = await supertest(server).post("/api/auth/login").send({
      username: "test",
      password: "abc123"
    })

    console.log(res)

    expect(res2.statusCode).toBe(200)
    expect(res2.type).toBe("application/json")
    expect(res2.body.message).toBe("welcome, test")
    expect(res2.body.token).toBeTruthy()
  })
})


