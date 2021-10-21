class NotImplementedException extends Error {
    constructor(){
        super("Not implemented Exception")
    }
}
//contratos que as classes devem respeitar 
class ICrud{
    create(item){
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

    isConnected(){
        throw new NotImplementedException()
    }

    connect(){
        throw new NotImplementedException()
    }

    etc(id){
        throw new NotImplementedException()
    }
}

module.exports = ICrud