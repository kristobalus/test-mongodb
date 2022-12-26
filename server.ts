
import restify = require('restify');
import { MongoClient } from "mongodb";
const logger = require('restify-logger');

(async () => {

    const client = new MongoClient('mongodb://localhost:27017', { monitorCommands: true })
    await client.connect()

    const server = restify.createServer();
    // server.use(logger("combined"))
    server.get('/users/:id', async (req, res) => {
        const collection = client.db("test").collection("users")
        const user = await collection.findOne({ "public.externalId": parseInt(req.params.id) })
        if (!user ) {
            res.send(404, `User not found for id=${req.params.id}`)
            return
        }
        res.json(user)
    })

    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    })

})().catch(err => console.log(err))

