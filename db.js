import {MongoClient} from 'mongodb'

let db;

async function ConnectDb(cd) {
    // const URI = process.env.URI
    const client = new MongoClient(process.env.URI)
    
    
    await client.connect()
    db = client.db('msc-project')
    cd()
}
export{
    db, ConnectDb
}