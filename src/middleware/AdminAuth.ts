import { NextFunction, Request,Response } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../entity/User";
import { AppDataSource } from "../db/DBconnection";
const secretkey ="THISISADMINTOKENKEY"

const auth = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const userrepo = AppDataSource.getRepository(User)
    const adtoken = req.cookies.jwt
    if(!adtoken){
      res.status(404).json({error:' YOU ARE NOT ADMIN !'})
    }
    
    const veryfytoken = await jwt.verify(adtoken,secretkey)
    console.log(veryfytoken,'token veryfied...');
    
    if(!veryfytoken){
      res.status(404).json({error:' You are not admin'})
   
    }
     
     next()
      
  } catch (error) {
    console.log('Admin auth error::',error);
    
  }
}

export default auth