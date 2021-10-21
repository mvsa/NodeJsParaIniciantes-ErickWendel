const assert = require("assert");
const api = require("../../api");

let app = {}

describe.only('Auth suite case', function(){
    this.beforeAll(async()=>{
        app = await api;
    });

    it('should get a token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload:{
                username: 'dasilvar',
                password: '123'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)

    })
})