const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDb = require('./src/db/strategies/mongodb/mongodb')
const HeroiSchema = require('./src/db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./src/routes/heroRoutes')
const AuthRoutes = require('./src/routes/authRoutes')


const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')
const HapiJwt = require('hapi-auth-jwt2')

const JWT_SECRET = 'MY_SECRET'

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

    const swaggerOptions = {
        info:{
            title: 'Api Herois',
            version: 'v1.0'
        },
        lang:'pt'
    }
 
    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]) //registrar modulos e comunicar com modulos ja existentes

    //vou usar uma estrategia de authenticação chamada jwt que usa um schema chamado jwt tbm
    app.auth.strategy('jwt','jwt',{
        key: JWT_SECRET,
        // options:{
        //     expiresIn: 20
        // }
        validate: (dado, request) =>{
            //verifica no banco se o user continuia ativo
            //verifica no banco se o user continua adimplente
            return{
                isValid: true
            }
        }
    })

    app.auth.default('jwt') // por default toda autenticação em nosso projeto vai usar o schema jwt

    //ROTAS Geradas dinamicamente a partir dos metodos da classe
    //
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ])

    await app.start();
    console.log('Servidor rodando em porta',app.info.port);

    return app
}

module.exports = main()

// npm i vision inert hapi-swagger