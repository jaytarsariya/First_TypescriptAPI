import { Request,Response } from "express";
import { ProductService } from "../service/ProductService";
import { productdto } from "../../dto/UserDto";

const productservice = new ProductService()

export const createProduct = async(req:Request,res:Response):Promise<void>=>{
  try {
    const dto:productdto = req.body

    const product = await productservice.CreateProduct(dto)
    res.status(200).json({data:product})
  } catch (error) {console.log(error)}
}

export const findproduct = async(req:Request,res:Response):Promise<void>=>{
  try {
  const data = await  productservice.viewproduct() 
  res.status(200).json({data:data})
  } catch (error) {
    console.log('view product error',error);
    
  }
}

export const deleteproduct = async(req:Request,res:Response):Promise<void>=>{
  try {
  const id = parseInt(req.query.id as string) 
  await productservice.deleteproduct(id) 
  res.status(200).json({data:' Product Deleted successfull ! '})
  } catch (error) {
  console.log('delete product error',error);
    
  }
}

export const updateproduct = async(req:Request,res:Response):Promise<void>=>{
  try {
  const id = parseInt(req.params.id)
  const data = await productservice.updateproduct(id,req.body)  
  res.status(200).json({data:data})
  } catch (error) {
    console.log('update product error',error);
    
  }
}