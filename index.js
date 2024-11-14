import { getDocuments, selectDocument, insertDocument, updateDocument } from "./modules/connectionManager.mjs";
import { BSON } from "mongodb";

async function run() {
  
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
      "user":"MildredHernandez",
      "password":"Ragazza69",
      "firstName":"Mildred",
      "lastName":"Hernandez",
      "position":"Employee",
      "imageName":"frog.jpg"};

    //await necesario pára no tener problemas de sincronizacion
    //await insertDocument('users', insertQuery);

    //Regresa un arreglo con todos los documentos de la coleccion
    const users = await getDocuments('users');
    //Asi se accede a cada uno de ellos
    users.forEach(user => {
      console.log(user);
    });
}

run().catch(console.dir);