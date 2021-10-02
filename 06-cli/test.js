const {deepEqual,ok} = require('assert') ;

const input = require('./service');

const DEFAULT_ITEM = {nome: 'Flash', poder:'Speed', id:1}
const DEFAULT_ITEM_ATUALIZAR = {nome: 'superman', poder:'força',id:2}

describe ('Suite de manipulação de Herois', ()=>{
    before(async()=>{
        await input.register(DEFAULT_ITEM)
        await input.register(DEFAULT_ITEM_ATUALIZAR)
    })

    it('should be able to search a hero, using files', async()=>{
        const expected = DEFAULT_ITEM
        const [resultado] = await input.list(expected.id) //pegando a 1 posicao do retorno do filter via destructuring
        


        deepEqual(resultado, expected)
        //ok define so se o objeto ta definido ou não, true ou n
        //deepequal faz uma validação mais profunda

    })

    it('should be able to register a hero, using files', async()=>{
        const expected = DEFAULT_ITEM
        await input.register(DEFAULT_ITEM)
        const [actual] = await input.list(DEFAULT_ITEM.id)
        
        deepEqual(actual, expected)
    })

    it('should be able to delete a hero, using files', async()=>{
        const expected = true;
        const resultado = await input.delete(DEFAULT_ITEM.id)
        deepEqual(resultado, expected)
    })


    it('should be able to update a hero by id, using files', async()=>{
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome:'batman',
            poder:'dinheiro'
        }
        const novoDado = {
            nome:'batman',
            poder:'dinheiro'
        }
        await input.update(DEFAULT_ITEM_ATUALIZAR.id,novoDado)
        const [resultado] = await input.list(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })
})