const ICrud = require("./interfaces/InterfaceCrud");
const Mongoose = require("mongoose");

const STATUS = {
  0: "Desconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectando",
};

class MongoDB extends ICrud {
  constructor() {
    super(); // classe que extende precisa chamar o super para invocar o construtor da pai
    this._herois = null;
    this._driver = null;
  }

  isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === STATUS[1]) return state;
    if (state !== STATUS[2]) return state;

    new Promise((resolve) => setTimeout(resolve, 1000));
    return STATUS[this._driver.readyState];
  }

  defineModel() {
    heroiSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true,
      },
      poder: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: new Date(),
      },
    });

    this._herois = Mongoose.model("herois", heroiSchema);
  }

  connect() {
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

    this._driver = connection
  }

  async create(item) {
    const resultCadastrar = await this._herois.create({
      nome: "Natalia",
      poder: "tecnicas",
    });

    console.log("result cadastrar", resultCadastrar);
  }
}

module.exports = MongoDB;
