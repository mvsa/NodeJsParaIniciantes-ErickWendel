class NotImplementedException extends Error {
    constructor(){
        super("Not implemented Exception")
    }
}

class ICrud{
    creaste(item){
        throw new NotImplementedException()
    }

    read(query){
        throw new NotImplementedException()
    }

    update(id,item){
        throw new NotImplementedException()
    }

    delete(id){
        throw new NotImplementedException()
    }
}

class MongoDB extends ICrud{

}

class ContextStrategy{
    constructor(strategy){
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
        return this._database.update(id.item)
    }

    delete(id){
        return this._database.delete(id)
    }
}