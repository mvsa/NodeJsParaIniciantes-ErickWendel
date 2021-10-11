const assert = require('assert')
const Postegres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postegres())

describe('Postgres Strategy', function(){
    this.timeout(Infinity)
    it('PostgresSql Connection', async function(){
        const result = await context.isConnected()
        assert.equal(result, true)
    })
})