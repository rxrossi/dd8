import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm"
import { Sale } from "./Sale"
@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  value: number

  @OneToMany(type => Sale, sale => sale.client)
  sales: Sale[]
}
