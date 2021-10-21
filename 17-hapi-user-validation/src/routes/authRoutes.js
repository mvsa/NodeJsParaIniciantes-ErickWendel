const Joi = require('joi')
const Boom = require('boom')
const BaseRoute = require("./base/baseRoute");
const Jwt = require('jsonwebtoken')

const PasswordHelper = require('../helpers/passwordHelper')

const failAction = (request, headers, erro )=>{
    throw erro
}

const USER = {
    username: 'dasilvar',
    password: '123'
}

class AuthRoutes extends BaseRoute{

    constructor(secret, db){
        super();
        this.secret = secret;
        this.db = db;
    }

    login(){
        return{
            path:'/login',
            method:'POST',
            config:{
                auth: false, //desabilita necessitade de token de autenticação
                tags:['api'],
                description: 'Obter Token',
                notes: 'realiza login com user e senha do banco',
                validate:{
                    failAction,
                    payload:{
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const {username, password} = request.payload

                const [usuario] = await this.db.read({
                    username: username.toLowerCase()
                })

                if(!usuario){
                    return Boom.unauthorized('Usuário não encontrado')
                }

                const match = await PasswordHelper.comparePassword(password, usuario.password)
                if(!match){
                    return Boom.unauthorized('Usuário ou senha invalidas')
                }

                // if(username.toLowerCase() !== USER.username || password !== USER.password){
                //     return Boom.unauthorized()
                // }
                const token = Jwt.sign({
                    username, 
                    id: usuario.id
                }, this.secret)
                
                return {
                    token
                }
            }
        }
    }

}

module.exports = AuthRoutes