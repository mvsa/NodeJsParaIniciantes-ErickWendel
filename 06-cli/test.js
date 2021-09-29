const {deepEqual,ok} = require('assert') ;

const DEFAULT_ITEM = {nome: 'Flash', poder:'Speed', id:1}

describe ('Suite de manipulação de Herois', ()=>{

    it('should be able to register a hero, using files', async()=>{
        const expected = {DEFAULT_ITEM}

        ok(null, expected)
    })
})