import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column
} from "typeorm"
import { Client } from "./Client"
import { Service } from "./Service"
import { Professional } from "./Professional"

@Entity()
export class Sale extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Client, client => client.sales)
  client: Client

  @ManyToOne(type => Professional, professional => professional.sales)
  professional: Professional

  @ManyToOne(type => Service, service => service.sales)
  service: Service

  @Column()
  date: Date

  @Column()
  value: number

  @Column()
  discount: number

  @Column()
  notes: string
}
