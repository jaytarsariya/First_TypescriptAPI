import { AppDataSource } from "../../db/DBconnection";
import { User } from "../../entity/User";
import { Task } from "../../entity/task";
import { TaskInterface } from "../../interface/TaskInterface";

export class TaskService {
  private taskrepo = AppDataSource.getRepository(Task)

  async getAllTask():Promise<Task[]> {
    return this.taskrepo.find();
  }

  async getTaskById(id:number): Promise<Task | null> {
    return this.taskrepo.findOne({where:{id}})
  }

  async createTask(taskdata:TaskInterface,userId:number):Promise<Task>{
    const newtask = new Task()
    newtask.title = taskdata.title
    newtask.description = taskdata.description
    newtask.user = userId
    return await this.taskrepo.save(newtask)
  }

  async updateTask(id:number,taskdata:TaskInterface):Promise<Task | null>{
  await this.taskrepo.update(id,taskdata)
  return this.taskrepo.findOne({where:{id}})
  }

  async deleteTask(id:number):Promise<Task | null>{
   const taskdelete =  this.taskrepo.findOne({where:{id}})
   if(taskdelete) {
    await this.taskrepo.delete(id)
    return taskdelete
   }else{
    return null
   }
  }

  async ComplatedTask(id:number):Promise<any>{
    const task = await this.taskrepo.findOne({where:{id}})
    if(task){
    return this.taskrepo.update(id,{completed:true})
  }
   

  }

}

