const assert = require("assert");
const Postegres = require("../db/strategies/postgres");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Postegres());
const MOCK_HEROI_CADASTRAR = { nome: "gaviao", poder: "flechas" };

describe("Postgres Strategy", function () {
  this.timeout(Infinity);
  this.beforeAll(async function () {
    await context.connect();
  });
  it("PostgresSql Connection", async function () {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it("should be able to register", async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    console.log(result)
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("should be able to read", async ()=>{
      const [result] = await context.read({nome:MOCK_HEROI_CADASTRAR.nome})
      delete result.id
      assert.deepEqual(result,MOCK_HEROI_CADASTRAR)
  })
});
