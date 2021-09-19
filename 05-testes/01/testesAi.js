const assert = require('assert'); // modulo do node para asserções
const { obterPessoas } = require('./service')
const nock = require('nock')
//assert.ok(false)


//pacote nock instalado para poder mockar os dados da API, simulando requisições e garantindo
//que os dados para o testes estejam sempre disponiveis

describe('Star Wars Tests', () => {
    before(() => {
        const response = {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'https://swapi.dev/api/planets/8/',
                    vehicles: [],
                    starships: [],
                    created: '2014-12-10T15:11:50.376000Z',
                    edited: '2014-12-20T21:17:50.311000Z',
                    url: 'https://swapi.dev/api/people/3/'
                }
            ]
        }

        nock('https://swapi.dev/api/people') //sempre que o teste tentar acessar essa url
            .get('/?search=r2-d2&format=json') //com esses parametros
            .reply(200, response) //retorne esse status e o valor

    })




    it('should be able to get r2d2 with correct format', async () => {
        const expected = [{ nome: 'R2-D2', altura: '96' }]
        const nomeBase = 'r2-d2'
        const result = await obterPessoas(nomeBase);
        assert.deepEqual(result, expected);
    })
})