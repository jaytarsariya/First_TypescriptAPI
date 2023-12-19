import { taskProduct } from "../../entity/taskProduct";
import { AppDataSource } from "../../db/DBconnection";
import { productdto } from "../../dto/UserDto";
import { DeleteResult } from "typeorm";


export class ProductService{
  private productrepo = AppDataSource.getRepository(taskProduct)

  async CreateProduct(dto:productdto):Promise<taskProduct|null>{
    const product = new taskProduct()
    product.pname = dto.pname
    product.price = dto.price
    product.img = dto.img
    return await this.productrepo.save(product)
  }

  async viewproduct():Promise<taskProduct[]>{
  return await this.productrepo.find()
  }

  async deleteproduct(id:number):Promise<DeleteResult>{
  return await this.productrepo.delete(id)
  }

  async updateproduct(id:number,dto:productdto):Promise<taskProduct|null>{
   await this.productrepo.update(id,dto)
  return this.productrepo.findOne({where:{id}})
  }




}