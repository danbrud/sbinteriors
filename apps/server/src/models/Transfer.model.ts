import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Default } from 'sequelize-typescript'
import { Client } from './Client.model'
import { TransferMethod } from './TransferMethod.model'

@Table
export class Transfer extends Model<Transfer> {

  @ForeignKey(() => Client)
  @Column
  clientId: number

  @Column
  date: Date

  @Column({ type: DataType.FLOAT })
  ilsAmount: number

  @Default(null)
  @Column({ type: DataType.FLOAT })
  foreignAmount: number

  @Default(null)
  @Column
  foreignAmountCurrency: string

  @Default(null)
  @Column
  description: string

  @Column
  account: string

  @ForeignKey(() => TransferMethod)
  @Column
  transferMethodId: number

  @BelongsTo(() => TransferMethod)
  transferMethod: TransferMethod

  @BelongsTo(() => Client)
  client: Client
}