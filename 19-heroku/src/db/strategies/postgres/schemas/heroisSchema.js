const Sequelize = require("sequelize");

const HeroiSchema = {
    name: "herois",
    schema: {
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
    options: {
        tableName: "TB_HEROIS", //informo que já exisite uma tabela que quero usar, caso isso fosse omitido ele iria resetar tudo
        freezeTableName: false,
        timestamps: false,
    },
};

module.exports = HeroiSchema