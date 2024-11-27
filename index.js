var express = require("express");
var app = express();

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  next();
});

app.use(express.json());


const { getDocuments, selectDocument, insertDocument, updateDocument } = require('./modules/connectionManager');
const { BSON } = require('mongodb');


app.post('/find/:collectionName',async (req, res)=>{
  const result = await selectDocument(req.params.collectionName, req.body);
  console.log(result);
  res.send(result);
});

app.post('/findAll/:collectionName',async (req, res)=>{
  const result = await getDocuments(req.params.collectionName);
  res.send(result);
});

app.post('/insert/:collectionName', async(req, res) =>{
  const result = await insertDocument(req.params.collectionName, req.body);
  res.send(result);
});

app.put('/update/:collectionName', async(req, res) =>{
  const result = await updateDocument(req.params.collectionName, req.body["Query"][0], req.body["Query"][1]);
  res.send(result);
});

app.get('/', (req, res)=>{
  console.log(req.body);
  res.send("Recibido");
})

app.listen(9292, ()=>{
  console.log("Escuchando en el puerto 9292");
})
/*async function run() {
  
    //Requerido para biscar por Id, es la forma de crear un objeto de Id para que Mongo entienda
    const nid = new BSON.ObjectId("6722a6ccaab354ab12f660b1");
    //Query con los datos a filtrar en busquedas o updates
    const filterQuery = {_id:nid};
    //await necesario pára no tener problemas de sincronizacion
    const resultSelect = await selectDocument('reservationHours', filterQuery);
    //Regresa un JSON con los datos del documento
    console.log(resultSelect);

    //Creacion de la fecha del dia de hoy con hora incluida
    const dateR = new Date();
    //Se crea la query que se encargara de definir los campos a modificar
    const updateQuery = {date: dateR};
    //await necesario pára no tener problemas de sincronizacion
    const resultUpdate = await updateDocument('reservationHours', filterQuery, updateQuery);
    //Regresa un mensaje de estado, donde se ve si se encontro el documento a modificar y si se modifico correctamente
    console.log(resultUpdate);

    //Se crea un documento a inertar para users con cada uno de sus campos excepto id, de eso se encarga la base de datos al momento
    const insertQuery = {
      "user":"",
      "password":"",
      "firstName":"",
      "lastName":"",
      "position":"",
      "imageName":""};

    //await necesario pára no tener problemas de sincronizacion
    //await insertDocument('users', insertQuery);

    //Regresa un arreglo con todos los documentos de la coleccion
    const users = await getDocuments('users');
    //Asi se accede a cada uno de ellos
    users.forEach(user => {
      console.log(user);
    });
}*/
