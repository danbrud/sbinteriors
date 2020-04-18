import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import { Transfer } from './Transfer.model'

@Table
export class TransferMethod extends Model<TransferMethod> {

  @Column
  name: string

  @HasMany(() => Transfer)
  transfers: Transfer[]
}