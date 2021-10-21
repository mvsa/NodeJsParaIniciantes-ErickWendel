const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDb = require('./src/db/strategies/mongodb/mongodb')
const HeroiSchema = require('./src/db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./src/routes/heroRoutes')
const AuthRoutes = require('./src/routes/authRoutes')

const PostGres = require('./src/db/strategies/postgres/postgres')
const UsuarioSchema = require('./src/db/strategies/postgres/schemas/usuarioSchema')


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

    const connectionPostgres = await PostGres.connect()
    const model = await PostGres.defineModel(connectionPostgres, UsuarioSchema)
    const contextPostgres = new Context(new PostGres(connectionPostgres, model))


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
        validate: async (dado, request) =>{
            //se depois do login o usuario for removido da base, as proximas requisições vão falhar, mesmo possuiindo um token
            const result = await contextPostgres.read({
                username: dado.username.toLowerCase(),
               // id: dado.id
            })
            console.log(result)
            
            if(result.length == 0){
                return {
                    isValid:false
                }
            }
            //verifica no banco se o user continuia ativo
            //verifica no banco se o user continua adimplente
            //se eu consolar o dado, ele mostra os dados do jwt descriptografados
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
        ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods())
    ])

    await app.start();
    console.log('Servidor rodando em porta',app.info.port);

    return app
}

module.exports = main()
