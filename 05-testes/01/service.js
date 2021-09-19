const {get} = require('axios');

const URL= `https://swapi.dev/api/people`;

const obterPessoas = async (nome)=>{
    const url = `${URL}/?search=${nome}&format=json`
    const result = await get(url)
    return result.data.results.map(mapearPessoas)
}

const mapearPessoas = (item)=>{
    return{
        nome: item.name,
        altura: item.height
    }
}

module.exports = {
    obterPessoas
}
