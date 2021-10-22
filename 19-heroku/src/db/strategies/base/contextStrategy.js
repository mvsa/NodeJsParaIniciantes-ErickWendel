const ICrud = require("../interfaces/InterfaceCrud");

class ContextStrategy extends ICrud {
  // classe abstrata

  constructor(strategy) {
    super();
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item); // ele vai tentar chamar a implementação create do banco passado/ Caso o banco
    // não tenha essa implementação vai ser puxado o metodo da classe pai que vai levantar a exception
  }

  read(item, skip, limit) {
    return this._database.read(item, skip, limit);
  }

  update(id, item, upsert = false) {
    return this._database.update(id, item, upsert);
  }

  delete(id) {
    return this._database.delete(id);
  }

  isConnected() {
    return this._database.isConnected();
  }

  static connect() {
    return this._database.connect();
  }
}

module.exports = ContextStrategy;
