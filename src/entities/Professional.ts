const { Entity, PrimaryGeneratedColumn, Column } = window.require("typeorm")

@Entity()
export default class Professional {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  percentage: number
}
