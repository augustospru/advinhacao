const {MongoClient, ObjectId} = require('mongodb');

const uri = "mongodb+srv://augustospru:DTdOOk7aVAeVpM88@advinhacao.hxhcgkl.mongodb.net/advinhacao?retryWrites=true&w=majority";

let singleton;

async function connect() {
    if (singleton) return singleton;
    const client = new MongoClient(uri);
    await client.connect();
    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

async function getAll() {
    const db = await connect();
    return await db.collection("advinhacao").find().toArray();
}

async function getOneRandom() {
    const db = await connect();
    const results = await db.collection("advinhacao").find().toArray();
    //console.log(results);
    //console.log(results.length);
    const count = results.length; //await db.collection("advinhacao").count();
    const rng = Math.floor(Math.random() * count);
    return results[rng];
}

async function insertOne(word) {
    const db = await connect();
    return await db.collection("advinhacao").insertOne(word);
}

async function deleteOne(id) {
    const db = await connect();
    return db.collection("advinhacao").deleteOne({ _id: new ObjectId(id) });
}

module.exports = {getAll, getOneRandom, insertOne, deleteOne};
