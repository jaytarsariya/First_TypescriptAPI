import express from 'express'
import { AppDataSource } from './src/db/DBconnection'
const app = express()
const port = 3000
import { router } from './src/api/router/taskRouter'
import cookieParser from 'cookie-parser';
import hbs from 'hbs'
import path from 'path'


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.set("view engine","hbs")
app.set("views",path.join(__dirname,'./src/views'))
app.use("/api",router)

try {
  AppDataSource.initialize()
  console.log('DB connected');
  
  app.listen(port,()=>{
    console.log(`server running on port ${port}`);
  })
    
} catch (error) {
  console.log(error);
  
}