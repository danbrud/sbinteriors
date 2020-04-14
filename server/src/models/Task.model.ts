import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Default } from 'sequelize-typescript'
import { Client } from './Client.model'

@Table
export class Task extends Model<Task> {

  @ForeignKey(() => Client)
  @Column
  clientId: number

  @Column
  type: string

  @Column
  startTime: Date

  @Column
  endTime: Date

  @Default(null)
  @Column({ type: DataType.FLOAT })
  price: number

  @Default(null)
  @Column
  description: string

  @BelongsTo(() => Client)
  project: Client
}