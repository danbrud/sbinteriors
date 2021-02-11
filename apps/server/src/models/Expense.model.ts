import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Default } from 'sequelize-typescript'
import { Client } from './Client.model'

@Table
export class Expense extends Model<Expense> {

  @ForeignKey(() => Client)
  @Column
  clientId: number

  @Column
  name: string

  @Column
  date: Date

  @Column({ type: DataType.FLOAT })
  amount: number

  @Default(null)
  @Column
  description: string

  @BelongsTo(() => Client)
  client: Client
}