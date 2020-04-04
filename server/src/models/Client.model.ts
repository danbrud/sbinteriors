import { Table, Column, Model, HasMany, DataType, Default } from 'sequelize-typescript'
import { Transfer } from './Transfer.model'

@Table
export class Client extends Model<Client> {

  @Column
  firstName: string

  @Column
  lastName: string

  @Column
  email: string

  @Column
  phone: string

  @Column
  spouseName: string

  @Default(0)
  @Column({ type: DataType.FLOAT })
  balance: number

  @HasMany(() => Transfer)
  transfers: Transfer[]
}