const assert = require('assert');
const api = require('../../api');

let app = {}


describe.only('Heroes Api Test Suite', function(){
    this.beforeAll(async ()=>{
        app = await api
    })
    it('should be ale to list /herois', async()=>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))

    })
})