const assert = require("assert");
const Postegres = require("../db/strategies/postgres/postgres");
const HeroiSchema = require('../db/strategies/postgres/schemas/heroisSchema')
const Context = require("../db/strategies/base/contextStrategy");


const MOCK_HEROI_CADASTRAR = { nome: "gaviao", poder: "flechas" };
const MOCK_HEROI_ATUALIZAR = { nome: "batman", poder: "dinheiro" };

let context = {}
describe("Postgres Strategy", function () {
  this.timeout(Infinity);
  this.beforeAll(async function () {
    const connection = await Postegres.connect()
    const model = await Postegres.defineModel(connection, HeroiSchema)
    context = new Context(new Postegres(connection, model))
    await context.delete()
    await context.create(MOCK_HEROI_ATUALIZAR)
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
  });

  it('Should be able to update a register', async()=>{
    const [itemAtualizar] = await context.read({nome:MOCK_HEROI_ATUALIZAR.nome})
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome:'mulher maravilha'
    }
    const [result] = await context.update(itemAtualizar.id, novoItem)
    const [itemAtualizado] = await context.read({id:itemAtualizar.id})
    assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    assert.deepEqual(result, 1)

  })

  it('should be able to delete a register', async ()=>{
    const [item] = await context.read({})
    const result = await context.delete(item.id)
    assert.deepEqual(result,1)
  })
  
});
