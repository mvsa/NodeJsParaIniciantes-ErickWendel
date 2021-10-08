const ICrud  = require('./interfaces/InterfaceCrud')

class MongoDB extends ICrud{
    constructor(){
        super() // classe que extende precisa chamar o super para invocar o construtor da pai
    }

    create(item){
        console.log('item salvo em MONGODB')
    }
}

module.exports =  MongoDB