import { MongoClient, ObjectId } from 'mongodb';

let db;

//connect to MongoDB
async function connectToDb(cb) {
    const client = await MongoClient.connect('mongodb://host.docker.internal:27017', { useNewUrlParser: true });
    await client.connect();
    db = client.db('hustle');
    cb();
}

export {
    db,
    connectToDb,
    ObjectId
};