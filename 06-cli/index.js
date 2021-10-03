const Commander = require('commander')
const Heroi = require('./heroi')
const Database = require('./service')

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")

        .option('-c, --cadastrar', "Cadastrar um heroi")
        .parse(process.argv)
    const heroi = new Heroi(Commander)
    
    try {
        if(Commander.cadastrar){
            const resultado = await Database.register(Commander)
        }
    } catch (error) {
        console.error('Erro', error)
    }
}

main()