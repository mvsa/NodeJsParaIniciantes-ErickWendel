const Sequelize = require('sequelize');
const driver = new Sequelize("heros", "mavcs", "mysecret", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorAliases: false,
});

async function main() {
  const Herois = driver.define("herois", {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    nome:{
        type: Sequelize.STRING,
        required:true,
    },
    poder:{
        type:Sequelize.STRING,
        require:true
    }
  },{
      tableName: 'TB_HEROIS', //informo que já exisite uma tabela que quero usar, caso isso fosse omitido ele iria resetar tudo
      freezeTableName:false,
      timestamps:false
  });
  await Herois.sync()

  await Herois.create({
      nome: 'Lanterna verde',
      poder:'Anel'
  })

  const result = await Herois.findAll({raw:true, attributes:['nome']}); //raw true para trazer as infos mais importantes
  console.log('result', result)
}

main()
