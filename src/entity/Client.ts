import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm"
import Sale from "./Sale"

@Entity()
export default class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => Sale, sale => sale.client)
  sales: Sale[]
}
