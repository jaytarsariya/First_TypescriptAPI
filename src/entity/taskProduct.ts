import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()

export class taskProduct{
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  pname:string

  @Column()
  price:number

  @Column()
  img:string
}