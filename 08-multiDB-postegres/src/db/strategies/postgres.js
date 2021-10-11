const ICrud = require("./interfaces/InterfaceCrud");
const Sequelize = require("sequelize");

class Postegres extends ICrud {
  // classe concreta
  constructor() {
    super(); // classe que extende precisa chamar o super para invocar o construtor da pai
    this._driver = null;
    this._herois = null;
    this._connect()
  }

  async isConnected() {
    try {
        await this._driver.authenticate()
        return true
    } catch (error) {
        console.log('fail', error);
        return false
    }
  }

  _connect() {
    this._driver = new Sequelize("heros", "mavcs", "mysecret", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false,
    });
  }

  async defineModel() {
    this._herois = this._driver.define(
      "herois",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          require: true,
        },
      },
      {
        tableName: "TB_HEROIS", //informo que já exisite uma tabela que quero usar, caso isso fosse omitido ele iria resetar tudo
        freezeTableName: false,
        timestamps: false,
      }
    );
    await Herois.sync();
  }

  create(item) {
    console.log("item salvo em Postegres");
  }
}

module.exports = Postegres;
