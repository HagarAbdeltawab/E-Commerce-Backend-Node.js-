process.on('uncaughtException', err=> console.log(err))
import express from 'express'; 
import { dbConnection } from './database/dbConnection.js';
import dotenv from "dotenv";
import cors from 'cors';
import { bootstrap } from './src/modules/index.routes.js';
const app = express()
const port = 3000 
app.use(cors); 
dotenv.config();
dbConnection();
app.use(express.json()); 
app.use('/uploads',express.static('uploads'))
bootstrap(app)
process.on('unhandledRejection', err=> console.log(err))  
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))