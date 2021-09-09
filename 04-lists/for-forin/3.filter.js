const {obterPessoas} = require('./service');


Array.prototype.meuFilter = function(callback){
    const list = []
    for(index in this){ // this é a lista completa
        const item = this[index]
        //estou usando so o primeiro paramentro na chamada abaixo do filter padrao do JS (linha 23) , porem os 2 segundos ficam tbm disponives
        const result = callback(item,index, this) // o resultado desse callback deve ser true ou false/ que no caso é a função passada em callback na linha 23
        // 0 , "", null, undefied tambémm é false
        if(!result) continue;
        list.push(item)
    }
    return list;
}

async function main() {

    try {

        const {results} = await obterPessoas('a')

     //   const familiaLars = results.filter(function(item){
            // por padrao retorna um booleano para checar se deve manter ou
            //remover da lista e com isso realizar a filtragem
            //false remove / true mantem

            //indexoF tenta buscar o indice(s) em que o elemento pesquisado se encontra no arrary
            //caso não tenha retorna -1
    //        const result = item.name.toLowerCase().indexOf('lars') !== -1
    //        return result;

    //    })

        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index:${index}`, lista.length)
           return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familiaLars.map(pessoa => pessoa.name);
        console.log(names);


    } catch (error) {
        console.error('erro na consulta', error)
    }

}


main()