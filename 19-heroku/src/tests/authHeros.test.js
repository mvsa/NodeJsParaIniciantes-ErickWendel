const assert = require("assert");
const api = require("../../api");

const Context = require("../db/strategies/base/contextStrategy");
const PosteGres = require("../db/strategies/postgres/postgres");
const UsuarioSchema = require("../db/strategies/postgres/schemas/usuarioSchema");

let app = {};

const USER = {
    username: "dasilvar",
    password: "123"
}

const USER_BD = {
    ...USER,
    password: '$2b$04$qgnuOejSJprJcugWai6XY.QopNI.01xs/T05EPIMpCCkOc5c/tgoi'
}

describe("Auth suite case", function () {
    this.beforeAll(async () => {
        app = await api;

        const connectionPostgres = await PosteGres.connect();
        const model = await PosteGres.defineModel(
            connectionPostgres,
            UsuarioSchema
        );
        const postgres = new Context(new PosteGres(connectionPostgres,model ))
        await postgres.update(null, USER_BD, true)
    });

    it("should get a token", async () => {
        const result = await app.inject({
            method: "POST",
            url: "/login",
            payload: USER,
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    });

    it('should deny a wrong login (unauthorized)', async()=>{
        const result = await app.inject({
            method: "POST",
            url: "/login",
            payload: {
                username:'dasilvars',
                password:'321'
            },
        });
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(dados.error, "Unauthorized")

    })
});
