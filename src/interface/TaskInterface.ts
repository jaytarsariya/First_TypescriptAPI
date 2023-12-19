import { User } from "../entity/User"

export class TaskInterface{
  id:number
  title:string
  description:string
  completed:boolean
  userId:User
}