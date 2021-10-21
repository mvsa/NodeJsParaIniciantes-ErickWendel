const ICrud = require("../interfaces/InterfaceCrud");
const Sequelize = require("sequelize");

class Postegres extends ICrud {
    // classe concreta
    constructor(connection, schema) {
        super(); // classe que extende precisa chamar o super para invocar o construtor da pai
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (error) {
            console.log("fail", error);
            return false;
        }
    }

    static async connect() {
        const connection = new Sequelize("heros", "mavcs", "mysecret", {
            host: "localhost",
            dialect: "postgres",
            quoteIdentifiers: false,
            operatorAliases: false,
            logging:false
        });
        return connection;
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name,
            schema.schema,
            schema.options
        );
        await model.sync();
        return model;
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item);
        return dataValues;
    }

    async read(item = {}) {
        return await this._schema.findAll({ where: item, raw: true });
    }

    async update(id, item, upsert = false) {
        //upsert = update or insert if doesnt exisits
        const fn = upsert ? 'upsert' : 'update'
        return await this._schema[fn](item, { where: { id } }); //!!
        //metodo de update nao retorna valor atualizado e sim 1 //-1  success/error
    }

    async delete(id) {
        const query = id ? { id } : {};
        return this._schema.destroy({ where: query });
    }
}

module.exports = Postegres;
