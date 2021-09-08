const EventEmitter = require('events');



class MeuEmissor extends EventEmitter{

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click' //evento

meuEmissor.on(nomeEvento, function(click){ //observador
    console.log('um user clicou', click)
})


// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0;
// setInterval(() => {
//     meuEmissor.emit(nomeEvento,'no ok' + (count++))
// }, 1000);


const stdin = process.openStdin();
stdin.addListener('data', function(value){
    console.log(`Foi digitado: ${value.toString().trim()}`);
})


//Seguindo a diferença de promises e eventEmmiters
//a reformulação do codigo abaixo apenas vai executar uma vez, por conta de como promises funcionam:


// function main(){
//     return new Promise(function(resolve, reject){
//         stdin.addListener('data', function(value){
//            return resolve(value)
//         })        
//     })
// }

// main().then(function(resultado){
//     console.log('resultado', resultado.toString());
// })