
const util = require ('util');

const getUserAddressAsync = util.promisify(getUserAddress); 


function getUser(){
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function (){
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

main()

//adicionando um async ele automaticamente vai retonar uma promisse
async function main() {
    try{
        console.time('medida-promise');
        const usuario = await getUser();


        // const telefone = await getUserPhone(usuario.id);
        // const endereco = await getUserAddressAsync(usuario.id);
        //mudança siginificativa de performance ao colocar os awaits comentados no bloco de promise.all
        //pois ali serão rodados em segundo plano de forma assincrona

        //esses dois podem vir junto no bloco abaixo pois dependem apenas do codigo de usuario que nesse momento 
        //ja foi coletado
        const resultado = await Promise.all([
            getUserPhone(usuario.id),
            getUserAddressAsync(usuario.id)
        ]);

        const endereco = resultado[1];
        const telefone = resultado[0];

        console.log(`
        Nome: ${usuario.nome}
        Endereço: ${endereco.rua}, ${endereco.numero}
        Telefone: ${telefone.number}
        `);
        console.timeEnd('medida-promise');

    }catch(error){
        console.error('erro', error);
    }
}










