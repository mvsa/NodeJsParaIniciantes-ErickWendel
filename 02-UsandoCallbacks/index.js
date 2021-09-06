function getUser(callback){
    setTimeout(function (){
        return callback(null, {
            id:1,
            nome: 'Aladin',
            birthday: new Date()
        })
    },1000)
}


function getUserPhone(idUser, callback){
    setTimeout(()=>{
        return callback(null,{ //callback primeiro parametro é o erro, segundo é o sucesso
            number:1111111111,
            ddd: 11
        })
    },2000)
}



function getUserAddress(idUser, callback){
    setTimeout(()=>{
        return callback (null, {
            rua: 'rua azul',
            numero: 0
        })
    },2000);

}

//usando funções anonimas
getUser(function resolveUser(error, user){
    //null || "" || 0 === false

    if(error){
        console.error ('erro em usuário', error)
        return;
    }

    getUserPhone(user.id, function resolveUserPhone(error1, phone){
        if(error1){
            console.error ('erro em telefone', error1)
            return;
        }

        getUserAddress(user.id, function resolveAddress(error2, address){
            if(error2){
                console.error ('erro em telefone', error2)
                return;
            }
    
            console.log(`
            Nome: ${user.nome},
            Endereco: ${address.rua}, ${address.numero}
            Telefone: ${phone.number}
            `
            )
        })
    })
});










//função externa
// function resolveUser(erro, user){
//     console.log('usuario',user);
// }


//getUser(resolveUser);


