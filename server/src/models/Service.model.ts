import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript'
import { Task } from './Task.model'
import { Client } from './Client.model'
import { Contract } from './Contract.model'
// import { Client } from './Client.model'

@Table
export class Service extends Model<Service> {

  @Column
  name: string

  @HasMany(() => Task)
  tasks: Task[]

  @BelongsToMany(() => Client, () => Contract)
  clients: Client[]
}