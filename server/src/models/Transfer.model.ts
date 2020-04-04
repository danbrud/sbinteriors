import { Table, Column, Model, HasMany, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Client } from './Client.model'

@Table
export class Transfer extends Model<Transfer> {

  @ForeignKey(() => Client)
  @Column
  clientId: number

  @Column
  date: Date

  @Column({ type: DataType.FLOAT })
  amount: number

  @Column
  transferMethod: string

  @Column
  description: string

  @BelongsTo(() => Client)
  client: Client
}