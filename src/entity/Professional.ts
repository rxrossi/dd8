import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm"
import Sale from "./Sale"

@Entity()
export default class Professional extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  percentage: number

  @OneToMany(type => Sale, sale => sale.client)
  sales: Sale[]
}
