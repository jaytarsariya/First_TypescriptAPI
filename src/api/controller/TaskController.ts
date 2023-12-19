import { Request,Response } from "express";
import { TaskService } from "../service/TaskService";
import { TaskInterface } from "../../interface/TaskInterface";

const taskservice = new TaskService()

// View all task.. 
export const getAllTask = async (req:Request,res:Response):Promise<void> =>{
  const tasks = await taskservice.getAllTask()
  res.status(200).json({data:tasks})
};

// view task using id..
export const getTaskById = async (req:Request,res:Response):Promise<void> =>{
  const id = parseInt(req.params.id,10)
  const task = await taskservice.getTaskById(id)

  if(task) {
    res.json(task)
  }else{
    res.status(404).json({error:' Task not found !'})
  }
};


// Create task ..
export const createTask = async (req:Request,res:Response):Promise<void> =>{
const newTask:TaskInterface = req.body
const userId = parseInt(req.query.id as string)
const createdTask = await taskservice.createTask(newTask,userId)
res.status(201).json(createdTask)
}


// Update task ..
export const updateTask = async(req:Request,res:Response):Promise<void> =>{
  const id = parseInt(req.params.id,10);
  // const taskdata:TaskInterface = req.body
  const updatedtask = await taskservice.updateTask(id,req.body)

  if(updatedtask){
    res.json(updatedtask)
  }else{
    res.status(404).json({error:' Task not found !'})
  }
} 


// delete task ..
export const deleteTask = async(req:Request,res:Response):Promise<void>=>{
const id = parseInt(req.params.id,10);
const data = await taskservice.deleteTask(id)
if(data == null){res.json(' Task not found !')}
res.status(201).json({data:' Task delete successfull !'})
}

// task is complated or not => complated = true || not complated = false
export const CompletedTask = async(req:Request,res:Response):Promise<void>=>{
  try {
  const id = parseInt(req.query.id as string)
  const data = await taskservice.ComplatedTask(id)  
  if(!data){res.status(404).json({error:' Task not found !'})}
  res.status(200).json({data:' Your task has been Completed !'}) 
  } catch (error) {console.log(error)}
}