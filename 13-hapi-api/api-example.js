const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDb = require('./src/db/strategies/mongodb/mongodb')
const HeroiSchema = require('./src/db/strategies/mongodb/schemas/heroisSchema')
const app = new Hapi.Server({
    port: 5000
});

async function main(){
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))
    app.route([
        {
            path:'/herois',
            method:'GET',
            handler: (request, head) =>{
                return context.read()
            }
        }
    ])
    await app.start();
    console.log('Servidor rodando em porta',app.info.port);
}

main()