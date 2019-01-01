import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export default class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
