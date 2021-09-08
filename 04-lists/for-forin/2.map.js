const service = require('./service')

//Substitui um metodo global de listas e adicionei a minha propria implementacao de map
//em linhas gerais essa implentação serve para demonstrar como a função .map pode funcionar por baixo dos panos
//praticamente apenas abstrai um for padrão
Array.prototype.meuMap = function(callback){ // ele recebe uma função que tem um callback/pra cada item quando interar ele vai chamar a função
    const novoArrayMapeado = [];
    for(let indice = 0; indice<=this.length - 1; indice++){
        const resultado = callback(this[indice], indice) // estou chamando a função mandada na assinatura
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado;
}

async function main(){
    try {
        const results = await service.obterPessoas('b');
        // const names = []
        // results.results.forEach((item)=>{
        //     names.push(item.name);
        // })

        // const names = results.results.map(pessoa =>{
        //     return pessoa.name
        // })

        const names = results.results.meuMap(function(pessoa, indice){
            return pessoa
        })


        console.log('nomes', names)

    } catch (error) {
        console.error('erro na consulta', error)
    }

}

main()