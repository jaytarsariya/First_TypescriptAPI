import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Task{
@PrimaryGeneratedColumn()
id:number

@Column()
title:string

@Column()
description:string

@Column({default:false})
completed:boolean

@ManyToOne(()=>User,(User)=>User.task)
@JoinColumn({name:'userId'})
user:number
}