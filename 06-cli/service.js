const {readFile,writeFile} = require('fs')
const {promisify} = require('util');

const readFileAsync = promisify(readFile)
const writeFileAsyn = promisify(writeFile)

//const dadosJson = require('./herois.json') Como é um json eu poderia fazer dessa forma tbm

class Database{

    FILE_NAME

    constructor(){
        this.FILE_NAME = 'herois.json'
    }

    async getDataFromFile(){
        const file = await readFileAsync(this.FILE_NAME, 'utf8')
        return JSON.parse(file.toString())
        
    }

    async writeFile(dados){
        await writeFileAsyn(this.FILE_NAME, JSON.stringify(dados))
        return true
    }

    async register(heroi){
        const dados = await this.getDataFromFile()
        const id = heroi.id <= 2 ? heroi.id : Date.now()

        const constHeroiComId = {
            id,
            ...heroi 
        }

        const dadosFinal = [
            ...dados, 
            constHeroiComId
        ]

        const resultado = await this.writeFile(dadosFinal)
        return resultado;

    }


    async list(id){
        const data = await this.getDataFromFile()
        const filteredData = data.filter(item => {
            return id ? item.id === id : true        
        })
        return filteredData
    }

    async delete(id){
        if(!id){
           return  await this.writeFile([])

        }
        const data = await this.getDataFromFile()
        const indice = data.findIndex(item => item.id === parseInt(id))
        if(indice == -1){
            throw Error('usuário não existe')
        }

        data.splice(indice, 1);
        
        return await this.writeFile(data)
    }
}

module.exports = new Database();