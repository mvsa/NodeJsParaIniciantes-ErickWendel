const ICrud  = require('./interfaces/InterfaceCrud')

class Postegres extends ICrud{ // classe concreta
    constructor(){
        super() // classe que extende precisa chamar o super para invocar o construtor da pai
    }

    create(item){
        console.log('item salvo em Postegres')
    }
}

module.exports =  Postegres