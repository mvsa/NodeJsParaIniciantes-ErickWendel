const ICrud  = require('../interfaces/InterfaceCrud')

class ContextStrategy extends ICrud{ // classe abstrata
    
    constructor(strategy){
        super()
        this._database = strategy
    }

    create(item){
        this._database.create(item) // ele vai tentar chamar a implementação create do banco passado/ Caso o banco
        // não tenha essa implementação vai ser puxado o metodo da classe pai que vai levantar a exception
    }

    read(item){
        return this._database.read(item)
    }

    update(id,item){
        return this._database.update(id,item)
    }

    delete(id){
        return this._database.delete(id)
    }
}

module.exports = ContextStrategy