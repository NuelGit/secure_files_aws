import express from 'express'
import { db, ConnectDb} from './db.js'
import 'dotenv/config.js'

const app =express()
app.use(express.json())


const Port = process.env.PORT || 5000


ConnectDb (() =>{
    console.log('Successfully connected to Database')
    
    app.listen(Port, ()=>{
        console.log('Server is listening on port ' + Port)

})

})