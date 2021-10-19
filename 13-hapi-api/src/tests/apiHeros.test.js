const assert = require("assert");
const api = require("../../api");

let app = {};

describe.only("Heroes Api Test Suite", function () {
    this.beforeAll(async () => {
        app = await api;
    });
    it("should be ale to list /herois", async () => {
        const result = await app.inject({
            method: "GET",
            url: "/herois",
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it("should be able to paginate", async () => {
        const TAMANHO_LIMITE = 3;
        const result = await app.inject({
            method: "GET",
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
        });
        const dados = JSON.parse(result.payload);

        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE)

    });
    it("should filter an item", async () => {
        const TAMANHO_LIMITE = 3;
        const NAME = 'Clone3';
        const result = await app.inject({
            method: "GET",
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`,
        });
        const dados = JSON.parse(result.payload);

        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados[0].nome === NAME)


    });
});
