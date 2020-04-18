import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import { Task } from './Task.model'
// import { Client } from './Client.model'

@Table
export class Service extends Model<Service> {

  @Column
  name: string

  @HasMany(() => Task)
  tasks: Task[]
}