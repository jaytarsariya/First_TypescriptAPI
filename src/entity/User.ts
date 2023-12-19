import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Task } from "./task";

@Entity()

export class User {
 
  // @PrimaryGeneratedColumn('uuid')
  // uid:string

  @PrimaryGeneratedColumn()
  id:number

  @Column()
  username:string

 @Column()
 email:string

 @Column()
 password:string

 @Column('simple-array',{nullable:true})
 permission:string[]

 @Column({default:false})
 isdeletedAt:boolean

 @Column({default:false})
 isAdmin:boolean

 @Column({default:''})
 token:string
 
 @OneToMany(()=>Task,(Task)=>Task.user)
 task:Task[]
}