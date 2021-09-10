const {obterPessoas} = require('./service')


Array.prototype.meuReducer = function(callback, valorInicial){
    // se ele passou o valor inicial na chamada ele pega esse valor, se não passou ele pega o primeiro
    //elemento do arrary
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for(let index = 0; index<=this.length-1; index ++){
        valorFinal = callback(valorFinal, this[index])
    }
    return valorFinal
}






async function main (){

    try{
        let valorinicial = 0
        const {results} = await obterPessoas('a')
        const alturas = results.map(item =>parseInt(item.height))
        console.log('alturas', alturas)
        // const total = alturas.reduce((anterior, proximo)=>{
        //     return anterior + proximo
        // },valorinicial)

        const minhaLista = [
            ['marcos', 'vinicios'],
            ['accenture', 'compasso']
        ]

        const total = minhaLista.meuReducer((anterior, proximo) =>{
            return anterior.concat(proximo)
        },[])
        .join(', ') // cria uma nova string separando elementos por virgula

        console.log('total',total)

    }catch(err){
        console.error('erro', err)
    }

}

main()