import { Table, Column, Model, HasMany, DataType, Default } from 'sequelize-typescript'
import { Transfer } from './Transfer.model'
import { Project } from '../not-used/Project.model'
import { Task } from './Task.model'
import { Expense } from './Expense.model'

@Table
export class Client extends Model<Client> {

  @Column
  name: string

  @Column
  email: string

  @Column
  phone: string

  @Default(null)
  @Column
  spouseName: string

  @Column
  address: string

  @Column
  city: string

  @Default(null)
  @Column
  description: string

  @Default(0)
  @Column({ type: DataType.FLOAT })
  expenseBalance: number

  @Default(0)
  @Column({ type: DataType.FLOAT })
  taskBalance: number

  @Default(false)
  @Column
  isComplete: boolean

  @HasMany(() => Transfer)
  transfers: Transfer[]

  @HasMany(() => Task)
  tasks: Task[]

  @HasMany(() => Expense)
  expenses: Expense[]

}