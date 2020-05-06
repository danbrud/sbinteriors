import { Table, Column, Model, HasMany, DataType, Default, BelongsToMany } from 'sequelize-typescript'
import { Transfer } from './Transfer.model'
import { Project } from '../not-used/Project.model'
import { Task } from './Task.model'
import { Expense } from './Expense.model'
import { Service } from './Service.model'
import { Contract } from './Contract.model'

@Table
export class Client extends Model<Client> {

  @Column
  name: string

  @Column
  email: string

  @Default(null)
  @Column
  phone: string

  @Default(null)
  @Column
  spouseName: string

  @Default(null)
  @Column
  address: string

  @Default(null)
  @Column
  city: string

  @Default(null)
  @Column
  description: string

  @Default(null)
  @Column({ type: DataType.FLOAT })
  pricePerHour: number

  @Default(false)
  @Column
  isComplete: boolean

  @HasMany(() => Transfer)
  transfers: Transfer[]

  @HasMany(() => Task)
  tasks: Task[]

  @HasMany(() => Expense)
  expenses: Expense[]

  @BelongsToMany(() => Service, () => Contract)
  services: Service[]
}