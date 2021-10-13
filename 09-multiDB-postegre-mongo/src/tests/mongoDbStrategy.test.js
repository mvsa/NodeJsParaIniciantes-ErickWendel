const assert = require("assert");
const MongoDb = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new MongoDb());

describe("MongoDb test suite", function() {
    this.beforeAll(async () => {
        await context.connect();
    });
    it.only("should be able to check the connection", () => {
        const result = context.isConnected();
        const expected = "Conectado";

        assert.deepEqual(result, expected);
    });
});
