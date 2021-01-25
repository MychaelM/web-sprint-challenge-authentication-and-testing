const supertest = require("supertest")
const server = require("../api/server")

test('sanity', () => {
  expect(true).toBe(false)
})

describe("tests auth integration", () => {
  it("successfully registers new user", async () => {
    const res = await supertest(server)
      .post("/register")
      .send({
        username: "test",
        password: "abc123"
      })

      expect(res.statusCode).toBe(201)
      expect(res.type).toBe("application/json")
      expect(res.body.username).toBe("test")
  })
})
