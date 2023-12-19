import { Request,Response } from "express";
import { UserService } from "../service/UserService";
import { userdto } from "../../dto/UserDto";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'


const userservice = new UserService()

//   User Create..
export const createUser = async(req:Request,res:Response):Promise<void> =>{
  try {
  const dto:userdto = req.body
  if(!dto.username || !dto.email || !dto.password){
    res.status(404).json({error:' field is required ! '})
  }
   const newUser = await userservice.createUser(dto)
   res.status(201).json(newUser)
  } catch (error) {
  console.log('Controller:createuser:error',error);
  
  }
}


export const getAllUser = async(req:Request,res:Response):Promise<void> =>{
  const user = await userservice.getAllUser()
  res.status(201).json({user})
}


// View User By id..
export const getUserById = async(req:Request,res:Response):Promise<void> =>{
  try {
    const id =  req.params.id
    const user = await userservice.getUserById(id)
    if(!user){res.status(404).json({error:' User not found !'})}
    res.status(200).json({data:user})
  } catch (error) {
    console.log('Controller :getUserById :error',error);
  }
}


// User Soft Delete ..
export const DeleteUser = async(req:Request,res:Response):Promise<void>=>{
  const id = parseInt(req.params.id)
  await userservice.DeleteUser(id)  
  res.status(200).json({data:'User deleted successfull !'})
}

// User Login ..
export const LoginUser  = async(req:Request,res:Response):Promise<void>=>{
  try {
   const {email,password} = req.body
   if(!req.body.email || !req.body.password){res.status(404).json({error:'Field is required'})}
   const data = await userservice.LoginUser(email,password)
   if(!data){res.json('User not found !')}
   res.status(200).json({data:` User login successfull:  UserToken => ${data}`})
    
  } catch (error) {
    console.log(error,'Login User error');
  }
    
}


// Update User ..
export const updateUser = async(req:Request,res:Response):Promise<void>=>{
  try {
  const id = parseInt(req.params.id)
  
  const user = userservice.UpdateUser(id,req.body)
  res.status(200).json({data:' User Updated successfully '})
  } catch (error) {
    console.log(error,'update user error');
  }
    
}


// Admin login ..
export const Adminlogin = async(req:Request,res:Response):Promise<void>=>{
try {
const id = parseInt(req.query.id as string)  
const {email,password} = req.body
const admin = await userservice.AdminLogin(email,password)
if(admin === null){
  res.json(' Invalid username or password ')
}
const token = admin
console.log(token,'token.......');

res.cookie("jwt",token) 
res.status(200).json({data:' Admin login successfull ! '})


} catch (error) {
  console.log(error,'Admin login error');
}
}


// Admin LogOut .. 
export const AdminLogOut = async(req:Request,res:Response):Promise<void>=>{
  try {
  const {email,password} = req.body
  const admin = await userservice.adminLogOut(email,password) 
  if(admin == null){
    res.json('Invalid username or password')
  }
  res.clearCookie("jwt") 
  res.status(200).json({data:'Admin LogOut'})
  } catch (error) {
  console.log(' Admin login side error ',error);
    
  }
}


// forgetpassword ..
export const Forgetpassword = async(req:Request,res:Response):Promise<void>=>{
  try {
   const {email} = req.body
   const data = await userservice.forgetpassword(email)  
  if(!data){
    res.json('User not found')
  } 

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'jaytarsariya2002@gmail.com',
      pass:'myxj wepo akxa dlmy'
    }
  })

  const mailoptions ={
    from:'jaytarsariya2002@gmail.com',
    to:'jaytarsariya2002@gmail.com',
    subject:'This is your restpassword link',
    text:data
  }
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.error('Error sending email:.....', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  
  res.status(200).json({data:' Check link in your register mail Id '})
  } catch (error) {
    console.log(' forget password error ',error);
  }
    
}


// Rest password with link
 export const ResetPassword = async(req:Request,res:Response):Promise<void>=>{
  try {
const token = req.params.token 
const password = req.body.password
const hashedpassword = await bcrypt.hash(password,10)
console.log(token,'hello token..');
const data = await userservice.resetpassword(token,hashedpassword)
if(!data){
  res.json('invalid username and password')
}
res.status(200).json({data:'You Passwprd reset successfull !'})

} catch (error) {
console.log(' Reset password error :',error);
}
}

// export const resetlink = async(req:Request,res:Response):Promise<void>=>{
//   const {password,confpassword} = req.body
  
//  const user = req.body
//  console.log(user,'iddddddddd');
//  console.log(password,confpassword);
 
 

//   const data = await userservice
// }

// User data Pagination implimantation..
export const pagination = async(req:Request,res:Response):Promise<void>=>{
  try {
    const page = parseInt(req.query.page as string) || 1
    const perpage = parseInt(req.query.perpage as string) || 5

    const userPagination = await userservice.pagination(page,perpage)
    if(!userPagination){
      res.json(' Data not found !')
    }
    res.status(200).json({data:userPagination})
  } catch (error) {
    console.log('UserPagination error:',error);
    
  }
}

