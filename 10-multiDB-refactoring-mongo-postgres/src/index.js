const ContextStrategy = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb");
const Postegres = require("./db/strategies/postgres");

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();
contextMongo.etc();
