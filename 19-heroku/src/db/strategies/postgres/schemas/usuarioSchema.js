const Sequelize = require("sequelize");

const UsuarioSchema = {
    name: "usuarios",
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            required: true,
        },
        password: {
            type: Sequelize.STRING,
            require: true,
        },
    },
    options: {
        tableName: "TB_USUARIOS", //informo que já exisite uma tabela que quero usar, caso isso fosse omitido ele iria resetar tudo
        freezeTableName: false,
        timestamps: false,
    },
};

module.exports = UsuarioSchema