import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
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

  @BelongsTo(() => Client)
  client: Client
}