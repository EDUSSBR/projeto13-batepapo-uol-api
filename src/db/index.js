import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
let db
export default db = (async  (host=process.env.DATABASE_URL)=> {
    let conn;
    const client = new MongoClient(host)
    
    try {
        console.log("connecting to MongoDB...")
        const conn = await  client.connect() 
        console.log("Mongo is sucessfully connected!")
        return conn
        
    } catch (e) {
        console.log(e)
    }
})().then(client => client.db())
