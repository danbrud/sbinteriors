import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Default } from 'sequelize-typescript'
import { Project } from './Project.model'

@Table
export class Expense extends Model<Expense> {

  @ForeignKey(() => Project)
  @Column
  projectId: number

  @Column
  paymentMethod: string

  @Column
  date: Date

  @Default(false)
  @Column
  isPaid: boolean

  @Column({ type: DataType.FLOAT })
  amount: number

  @BelongsTo(() => Project)
  project: Project
}