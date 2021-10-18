const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDb = require('./src/db/strategies/mongodb/mongodb')
const HeroiSchema = require('./src/db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./src/routes/heroRoutes')


const app = new Hapi.Server({
    port: 5000
});

function mapRoutes(instance, methods){
    
    
    return methods.map(method => instance[method]()) // executando o metodo da posicao method
    //ex. new HeroRoute()['list']()
    //ex. new HeroRoute().list()
}


async function main(){
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    //ROTAS Geradas dinamicamente a partir dos metodos da classe
    app.route([
       ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start();
    console.log('Servidor rodando em porta',app.info.port);

    return app
}

module.exports = main()