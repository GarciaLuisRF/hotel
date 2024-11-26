const  {MongoClient, ServerApiVersion} =  require("mongodb");

const uri = "mongodb+srv://doreimon3:fw6xqj0DsUNaWypt@plannedflamecluster.r3ayz.mongodb.net/?retryWrites=true&w=majority&appName=PlannedFlameCluster";
const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});

//Metodo encargado de regresar todos los documentos, de una coleccion
async function getDocuments(collectionName){
  try{
    await client.connect();
    const database = client.db('hotelManagment');
    const collection = database.collection(collectionName);
    const lista = collection.find();
    let arreglo = [];
    for await(const lis of lista){
      arreglo.push(lis);
    }
    return arreglo;
  }catch{
    console.log("No jalo el Select pa");
    client.close();
    return null
  }finally{
    client.close();
  }
}

//Metodo encargado de regresar documentos, requiere nombre de la coleccion y la query de filtro que identifica al documento requerido
async function selectDocument(collectionName, filterQuery){
    try{
      await client.connect();
      const database = client.db('hotelManagment');
      const collection = database.collection(collectionName);
      return await collection.findOne(filterQuery);
    }catch{
      console.log("No jalo el Select pa");
      return null
    }finally {
      await client.close();
    }
  }
  
  //Metodo encargado de actualizar documentos, requiere nombre de la coleccion, query de filtro para identificar documentos a modificar
  // y la query con los valores a cambiar
  async function updateDocument(collectionName, filterQuery, updateQuery){
    try{
      await client.connect();
      const database = client.db('hotelManagment');
      const collection = database.collection(collectionName);
      const query = {$set: updateQuery}
      return await collection.updateOne(filterQuery, query);
    }catch{
      console.log("No jalo el Update pa");
      return null;
    }finally {
      await client.close();
    }
  }
  
  //Metodo encargado de insertar nuevos documentos a las colecciones, requiere el nombre de la coleccion y la query con los datos del documento
  async function insertDocument(collectionName, insertQuery){
    try{
      await client.connect();
      const database = client.db('hotelManagment');
      const collection = database.collection(collectionName);
      return await collection.insertOne(insertQuery);
    }catch{
      console.log("No jalo el Insert pa");
      return null;
    }finally {
      await client.close();
    }
  }
  
  module.exports = {getDocuments, selectDocument, insertDocument, updateDocument};