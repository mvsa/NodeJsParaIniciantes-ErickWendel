const assert = require("assert");
const MongoDb = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const MOCK_HEROI_CADASTRAR = {
    nome: "HulkS",
    poder: "força",
};

const MOCK_HEROI_DEFAULT = {
    nome: `homemaranha-${Date.now()}`,
    poder: "teia",
};

const MOCK_HEROI_UPDATE = {
    nome: `pato-${Date.now()}`,
    poder: "velocidade",
};
let MOCK_HEROI_ID = "";
const context = new Context(new MongoDb());

describe("MongoDb test suite", function () {
    this.beforeAll(async () => {
        await context.connect();
        await context.create(MOCK_HEROI_DEFAULT);
        const result = await context.create(MOCK_HEROI_UPDATE);
        MOCK_HEROI_ID = result._id;
    });
    it("should be able to check the connection", () => {
        const result = context.isConnected();
        const expected = "Conectado";

        assert.deepEqual(result, expected);
    });

    it("should be able to register", async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
    });

    it("should be able to list", async () => {
        //vou extrair apenas o nome e poder do objeto da primeira posição do retorno
        const [{ nome, poder }] = await context.read({
            nome: MOCK_HEROI_DEFAULT.nome,
        });
        const result = {
            nome,
            poder,
        };
        assert.deepEqual(result, MOCK_HEROI_DEFAULT);
    });

    it("should be able to update", async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: "novoNome",
        });
        assert.deepEqual(result.modifiedCount, 1);
    });

    it('should be able to delete', async()=>{
      const result = await context.delete(MOCK_HEROI_ID);
      assert.deepEqual(result.deletedCount,1)
    });
});
