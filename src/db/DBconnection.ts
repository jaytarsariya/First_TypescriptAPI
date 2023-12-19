import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "../entity/task"
import { User } from "../entity/User"
import path from "path"

export const AppDataSource = new DataSource({
  host:'localhost',
  type:'postgres',
  username:'postgres',
  database:'all_task',
  password:'jay123',
  entities:[path.join(__dirname,'..',"entity/**/*.ts")],
  synchronize:true,
  logging:false
})