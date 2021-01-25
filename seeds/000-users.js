exports.seed = async function(knex) {
  await knex("users").truncate()
  await knex("users").insert({
    username: "seed",
    password: "1234"
  })
}