const Joi = require('joi')
const Boom = require('boom')
const BaseRoute = require("./base/baseRoute");

const failAction = (request, headers, erro )=>{
    throw erro
}

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: "/herois",
            method: "GET",
            config:{
                tags: ['api'],
                description: 'Deve listar os herois',
                notes: 'Pode paginar e filtrar resultados por nome',
                validate:{
                    failAction,
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query;
                    let query = {}

                    if(nome){
                        query = {nome:{$regex: `.*${nome}.*`}}
                    }
            
                    return this.db.read(query,skip,limit);
                    
                } catch (error) {
                    console.log("erro", error);
                    return Boom.internal()
                }
            },
        };
    }

    create(){
        return{
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                validate:{
                    failAction,
                    payload:{
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(10)
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {nome, poder} = request.payload
                    const result = await this.db.create({nome, poder})
                    
                    return {
                        message: 'Heroi cadastrado com sucesso',
                        _id: result._id
                    }
                } catch (error) {
                    console.log('Erro', error)
                    return Boom.internal();
                }
            }
        }
    }

    update(){
        return{
            path: '/herois/{id}',
            method: 'PATCH', 
            config:{
                tags: ['api'],
                validate:{
                    params:{
                        id: Joi.string().required()
                    },
                    payload:{
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request)=>{
                try {
                    const {id} = request.params;

                    const {payload} = request;

                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString) //todas as chaves sem valor serão removidas

                    const result = await this.db.update(id, dados)

                    if(result.modifiedCount === 1){
                        return{
                            message: 'Heroi atualizado com sucesso'
                        }
                    }
                    
                    return{
                        message: 'Impossivel atualizar'
                    }

                } catch (error) {
                    console.error('erro', error);
                    return Boom.internal();
                }
            }
        }
    }

    delete(){
        return{
            path: '/herois/{id}',
            method: 'DELETE',
            config:{
                tags: ['api'],
                validate:{
                    failAction,
                    params:{
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {id} = request.params
                    const result = await this.db.delete(id);

                    if(result.deletedCount === 1){
                        return{
                            message: 'Heroi removido com sucesso'
                        }
                    }

                    return{
                        message: 'Impossivel deletar'
                    }
                } catch (error) {
                    console.log('erro', error)
                    return Boom.internal();
                }
            }
        }
    }
}

module.exports = HeroRoutes;
