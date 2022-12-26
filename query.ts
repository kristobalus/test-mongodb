

import { MongoClient } from "mongodb";
import assert = require("assert")

(async () => {

    const client = new MongoClient('mongodb://localhost:27017', { monitorCommands: true });
    await client.connect()
    const collection = client.db("test").collection("users")

    const time = Date.now()
    const count = 100_000
    for(let i = 0; i < count; i++) {
        const id = Math.ceil(1000 * Math.random())
        const result = await collection.findOne({ "public.externalId": id })
        assert.ok(result, `Failed with id=${id}`)
    }
    const diff = Date.now() - time
    console.log(`millis per op`, diff/count)
    process.exit(0)

})().catch(err => console.log(err))
