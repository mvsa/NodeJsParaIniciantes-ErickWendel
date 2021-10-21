const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'minhasenha'
const HASH = '$2b$04$9wYmBSGhKDuU1.KqLYVy/.Tx6MbSzIZZgm/dI520TNL8tAGjEf7MG'

describe('Password Helper test suite', function(){
    it('should generate a hash from a password', async ()=>{
        const result = await PasswordHelper.hashPassword(SENHA)
        assert.ok(result.length > 10)
    })

    it('should validate a hashed password', async()=>{
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })
})