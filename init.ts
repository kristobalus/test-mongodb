

import { MongoClient } from "mongodb";

(async () => {

    const client = new MongoClient('mongodb://localhost:27017', { monitorCommands: true });
    await client.connect()
    const collection = client.db("test").collection("users")
    const time = Date.now()
    await collection.deleteMany({})
    for(let i = 0; i < 100_000; i++) {
        await collection.insertOne({ public: { externalId:  i }})
    }
    await collection.createIndex({ "public.externalId": 1 })
    const diff = Date.now() - time
    console.log(diff)
    process.exit(0)

})().catch(err => console.log(err))
