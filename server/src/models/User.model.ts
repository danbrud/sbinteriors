import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Client } from './Client.model'

@Table
export class User extends Model<User> {

  @ForeignKey(() => Client)
  @Column
  clientId: number

  @Column
  username: string

  @Column
  password: string

  @Column
  role: string

  @BelongsTo(() => Client)
  client: Client
}