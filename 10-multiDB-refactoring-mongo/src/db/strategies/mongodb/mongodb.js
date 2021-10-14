const ICrud = require("../interfaces/InterfaceCrud");
const Mongoose = require("mongoose");

const STATUS = {
    0: "Desconectado",
    1: "Conectado",
    2: "Conectando",
    3: "Desconectando",
};

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super(); // classe que extende precisa chamar o super para invocar o construtor da pai
        this._schema = schema;
        this._connection = connection;
    }

    isConnected() {
        const state = STATUS[this._connection.readyState];
        if (state === STATUS[1]) return state;
        if (state !== STATUS[2]) return state;

        new Promise((resolve) => setTimeout(resolve, 1000));
        return STATUS[this._connection.readyState];
    }

    static connect() {
        Mongoose.connect(
            "mongodb://marcos:minhasenha@localhost:27017/herois",
            {
                useNewUrlParser: true,
            },
            (error) => {
                if (!error) return;
                console.log("Falha na conexão", error);
            }
        );

        const connection = Mongoose.connection;
        connection.once("open", () => {
            console.log("database rodando");
        });

        return connection;
       
    }

    async create(item) {
        return await this._schema.create(item);
    }

    async read(item, skip = 0, limit = 10) {
        return await this._schema.find(item).skip(skip).limit(limit);
    }

    update(id, item) {
        return this._schema.updateOne({ _id: id }, { $set: item });
    }

    delete(id) {
        return this._schema.deleteOne({ _id: id });
    }
}

module.exports = MongoDB;
