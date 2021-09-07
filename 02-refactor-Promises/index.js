
const util = require ('util');

const getUserAddressAsync = util.promisify(getUserAddress) //converte a função que ainda usa callback para Promise
//mas esse "cast" so funciona pois a função de callback foi criada seguindo a regra correta (1° param erro, segundo sucesso, callback no ultimo param da função)


function getUser(){
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function (){
          //  return reject(new Error('Erro exec'));
            return resolve({
                id:1,
                nome: 'Aladin',
                birthday: new Date()
            })
        },1000)
    })
}


function getUserPhone(idUser){
    return new Promise(function resolvePromise(resolve,reject){
        setTimeout(()=>{
            return resolve({ 
                number:1111111111,
                ddd: 11
            })
        },2000)
    })
}



function getUserAddress(idUser, callback){
    setTimeout(()=>{
        return callback (null, {
            rua: 'rua azul',
            numero: 0
        })
    },2000);

}

const userPromise = getUser();
//usuario (passa para frente) -> telefone -> 
userPromise
    .then(function(user){
        return getUserPhone(user.id) // se eu so retornasse isso, apenas vem o telefone no retorno, para que a prox funcao tenha o resultado da anterior
                                      //preciso primeiro resolver  a promise pegar o resultado dela, e manipular o seu retorno
            .then (function resolvePhone(result){
               return{
                   usuario: {
                       id: user.id,
                       nome: user.nome,
                   },
                   telefone: result
               } 
            })
    })
    //o 'result' tras o retorno anterior, ou seja, tudo oq veio no then de trás
    .then(function(result){
        const address = getUserAddressAsync(result.usuario.id)
        return address.then(function resolveAddress(resultado){
            return{
                usuario: result.usuario,
                telefone: result.telefone,
                endereco: resultado
            } 
        })
    })
    .then(function (result){
        console.log(`
        Nome: ${result.usuario.nome}
        Endereço: ${result.endereco.rua}, ${result.endereco.numero}
        Telefone: ${result.telefone.number}
        `);
    })
    .catch(function(error){
        console.error('erro', error);
        
    })








