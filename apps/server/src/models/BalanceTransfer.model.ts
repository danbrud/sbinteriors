import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript'
import { Client } from './Client.model'

@Table
export class BalanceTransfer extends Model<BalanceTransfer> {

  @ForeignKey(() => Client)
  @Column
  clientId: number

  @Column
  fromAccount: string

  @Column
  toAccount: string

  @Column
  date: Date

  @Column({ type: DataType.FLOAT })
  amount: number

  @BelongsTo(() => Client)
  client: Client
}