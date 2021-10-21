const assert = require("assert");
const api = require("../../api");

let app = {};

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhc2lsdmFyIiwiaWQiOjEsImlhdCI6MTYzNDc1ODAzOX0.me_NN_uFzmlPYHaFmyjbEDGb1R4rsSabTeRzv8kTb1Y';

const headers = {
    Authorization : TOKEN
}

const MOCK_CADASTRAR = {
    nome: 'Chapolin',
    poder: 'marreta'
}

const MOCK_INICIAL ={
    nome: 'ironman',
    poder: 'armadura'
}

let MOCK_ID = '';

describe.only("Heroes Api Test Suite", function () {
    this.beforeAll(async () => {
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: JSON.stringify(MOCK_INICIAL)
        })
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id;
    });
    it("should be ale to list /herois", async () => {
        const result = await app.inject({
            method: "GET",
            headers,
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
            headers,
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
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`,
        });
        const dados = JSON.parse(result.payload);

        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados[0].nome === NAME)


    });

    it('should register an item', async ()=>{
        const result = await app.inject({
            method: "POST",
            headers,
            url: `/herois`,
            payload: MOCK_CADASTRAR
        });
        const statusCode = result.statusCode
        const {message, _id} = JSON.parse(result.payload)


        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, "Heroi cadastrado com sucesso")
    });

    it('should be able to update partially (patch)', async()=>{
        const _id = MOCK_ID;
        const expected = {
            poder: 'Super Mira'
        }

        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso')

    })

    it('should not be able to update partially (patch)', async()=>{
        const _id = `507f191e810c19729de860ea`;
        const expected = {
            poder: 'Super Mira'
        }

        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Impossivel atualizar')

    })

    it('should be able to delete an hero', async()=>{
        const _id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`,
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message,'Heroi removido com sucesso')

    })
});
