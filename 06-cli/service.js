const {readFile} = require('fs')
const {promisify} = require('util');

const readFileAsync = promisify(readFile)

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

    writeFile(){

    }


    async list(id){
        const data = await this.getDataFromFile()
        const filteredData = data.filter(item => {
            return id ? item.id === id : true        
        })
        return filteredData
    }
}

module.exports = new Database();