const Commander = require("commander");
const Heroi = require("./heroi");
const Database = require("./service");

async function main() {
  Commander.version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i, --id [value]", "Id do heroi")

    .option("-c, --cadastrar", "Cadastrar um heroi")
    .option("-l, --listar", "Listar um heroi")
    .option("-r --remover", "Remove um heoroi por id")
    .option("-a --atualizar [value]", "Atualiza um heroi por id")
    .parse(process.argv);
  const heroi = new Heroi(Commander._optionValues);
  try {
    if (Commander._optionValues.cadastrar) {
      delete heroi.id; //refatorar essa logica
      const resultado = await Database.register(heroi);
      if (!resultado) {
        console.error("erro no cadastro");
        return;
      }
      console.log("heroi cadastrado");
    }

    if (Commander._optionValues.listar) {
      const resultado = await Database.list();
      console.log(resultado);
      return;
    }

    if (Commander._optionValues.remover) {
      const resultado = await Database.delete(heroi.id);
      if (!resultado) {
        console.error("Impossivel remover");
      }
      console.log("Deletado");
    }

    if (Commander._optionValues.atualizar) {
      const idParaAtualizar = parseInt(Commander._optionValues.atualizar);
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado); //ao converter de volta ele remove as chaves undefined/null

      const resultado = await Database.update(idParaAtualizar, heroiAtualizar);

      if (!resultado) {
        console.error("não foi possivel atualizar");
        return;
      }
      console.log(resultado)
      return;
    }
  } catch (error) {
    console.error("Erro", error);
  }
}

main();

// node index.js --cadastrar --nome Aquaman --poder marinho
