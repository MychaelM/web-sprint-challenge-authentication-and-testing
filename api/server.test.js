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
})


