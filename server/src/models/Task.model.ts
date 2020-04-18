import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Default } from 'sequelize-typescript'
import { Client } from './Client.model'
import { Service } from './Service.model'

@Table
export class Task extends Model<Task> {

  @ForeignKey(() => Client)
  @Column
  clientId: number

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

  @ForeignKey(() => Service)
  @Column
  serviceTypeId: number

  @BelongsTo(() => Service)
  serviceType: Service

  @BelongsTo(() => Client)
  project: Client
}