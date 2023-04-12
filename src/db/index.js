import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
let db
export default db = (async  (host=process.env.DATABASE_URL)=> {
    let conn;
    const client = new MongoClient(host, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    
    try {
        console.log("connecting to MongoDB...")
        return await client.connect().then((client)=>{
            console.log("Mongo is sucessfully connected!")
            return client
        })
        
    } catch (e) {
        console.log(e)
    }
})().then(client => client.db())
