//logar no mongo e acessar com user
//docker exec -it adeabbfea247 mongo -u marcos -p minhasenha --authenticationDatabase herois
//use herois
//show dbs / show collections

//obs tenho a database herois e a collection herois
//db.herois.insert({nome:'Flash', poder:'Velocidade', dataNascimento:'1998-01-01'})

//db.herois.find().pretty()

//i can use JS code into mongo

// for (let index = 0; index < 10; index++) {
//     db.herois.insert({nome:`Clone${index}`, poder:'Velocidade', dataNascimento:'1998-01-01'})   
// }

//db.herois.count()
//db.herois.findOne()
//herois.find().limit(5).sort({nome:-1})        < desc
//db.herois.find({}, {poder:1, _id:0}) traz apenas os poderes

//create
//db.herois.insert({nome:'Flash', poder:'Velocidade', dataNascimento:'1998-01-01'})

//read
//db.herois.find()

//update
// db.herois.update({_id:ObjectId("1231212d1d2")}, {nome:'outroNome'})     BSON
//no mongo ao atualizar um campo posso perder todos os outros, essa query de cima atualiza o nome
//mas o poder e data de nascimento sao perdidos, para atualizar somente um valor fazer:

// db.herois.update({_id:ObjectId("1231212d1d2")}, {$set: {nome:'outroNome'}})     BSON
// mas, se eu errar o nome do campo ele adiciona um novo campo ao inves de dar erro

//por padrao ele n atualiza e massa, apenas 1

//delete
//db.herois.remove({nome:'x'})