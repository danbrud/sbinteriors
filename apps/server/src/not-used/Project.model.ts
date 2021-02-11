import { Table, Column, Model, HasMany, Default, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Client } from '../models/Client.model'
import { Task } from '../models/Task.model'
import { Expense } from '../models/Expense.model'

@Table
export class Project extends Model<Project> {

  @ForeignKey(() => Client)
  @Column
  clientId: number

  @Column
  name: string

  @Column
  address: string

  @Column
  city: string

  @Column
  description: string

  @Default(false)
  @Column
  isComplete: boolean

  @HasMany(() => Task)
  tasks: Task[]

  @HasMany(() => Expense)
  expenses: Expense[]

  @BelongsTo(() => Client)
  client: Client
}