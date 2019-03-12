const test = require("ava");
const supertest = require("supertest");
const app = require("../../services/user/server").app;

const d = require("../../utils/default");

const delUser = require("../../utils/delUser");

test("check 404 status", async t => {
  try {
    await supertest(app).get("/status");
    t.fail("/status существует");
  } catch (err) {
    t.is(err.status, 404);
  }
});

test("check signIn", async t => {
  const response = await supertest(app)
    .post("/login")
    .send({ email: d.user.email, password: d.user.password })
    .set("Accept", "application/json");
  t.is(response.body.email, d.user.email);
  await delUser();
});

test("check signUp", async t => {
  await delUser();
  const response = await supertest(app)
    .post("/login")
    .send({ email: d.user.email, password: d.user.password })
    .set("Accept", "application/json");
  t.is(response.body.email, d.user.email);
});
