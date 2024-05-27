const { MongoClient } = require("mongodb");

async function run() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  await client.connect();

  const dbname = 'DBLP';
  const collectionName = 'publis';

  const database = client.db(dbname);
  const collection = database.collection(collectionName);

  const data1 = { type: "Book" };
  const documents = await collection.find(data1).toArray();

  const documents1 = await collection.find({ year: { $gte: 2011 } }).toArray();
  const documents2 = await collection.find({ year: { $gte: 2014 } }).toArray();
  const documents3 = await collection.find({ authors: "Toru Ishida" }).toArray();
  
  const documents4 = await collection.distinct('authors', { authors: "Toru Ishida" });
  const documents5 = await collection.distinct("authors");

  const  documents6 = await collection.find({ authors: "Toru Ishida" }).sort({ title: 1, startPage: 1 }).toArray();
  console.log(documents);
  console.log(documents1);
  console.log(documents2);
  console.log(documents3);
  console.log(documents4);
  console.log(documents5);
  console.log(documents6);
 
  await client.close();
}
run().catch(console.dir);
