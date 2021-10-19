const BaseRoute = require("./base/baseRoute");

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: "/herois",
            method: "GET",
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query;
                    let query, skipQ, limitQ = {}

                    if(nome){
                        query = {nome}
                    }
                    if(limit){
                        limitQ = parseInt(limit)
                    }
                    if(skip){
                        skipQ = parseInt(skip)
                    }
                    console.log(query)

                    return this.db.read(query,skipQ,limitQ);
                    
                } catch (error) {
                    console.log("erro", error);
                    return "erro interno";
                }
            },
        };
    }
}

module.exports = HeroRoutes;
