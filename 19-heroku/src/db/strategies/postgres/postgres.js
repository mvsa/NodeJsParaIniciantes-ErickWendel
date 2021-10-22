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
        const SSL_DB = process.env.SSL_DB === "true" ? true : undefined;
        const SSL_DB_REJECT =
            process.env.SSL_DB_REJECT === "false" ? false : undefined;

        let dialectOptions = {};

        if (SSL_DB) {
            dialectOptions = {
                ssl: {
                    require: SSL_DB,
                    rejectUnauthorized: SSL_DB_REJECT,
                },
            };
        }

        const connection = new Sequelize(process.env.POSTGRES_URL, {
            quoteIdentifiers: false,
            operatorAliases: false,
            logging: false,
            // ssl: process.env.SSL_DB, //Habilitando criptografia para ambiente prd
            dialectOptions,
        });
        return connection;
    }

    // static async connect() {
    //     const connection = new Sequelize("base", "user", "senha", {
    //         host: "localhost",
    //         dialect: "postgres",
    //         quoteIdentifiers: false,
    //         operatorAliases: false,
    //         logging:false
    //     });
    //     return connection;
    // }

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
        const fn = upsert ? "upsert" : "update";
        return await this._schema[fn](item, { where: { id } }); //!!
        //metodo de update nao retorna valor atualizado e sim 1 //-1  success/error
    }

    async delete(id) {
        const query = id ? { id } : {};
        return this._schema.destroy({ where: query });
    }
}

module.exports = Postegres;
