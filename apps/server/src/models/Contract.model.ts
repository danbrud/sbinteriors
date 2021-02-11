import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript'
import { Service } from './Service.model'
import { Client } from './Client.model'

@Table
export class Contract extends Model<Contract> {

  @ForeignKey(() => Client)
  @Column
  clientId: number

  @ForeignKey(() => Service)
  @Column
  serviceId: number

  @Column
  includedHours: number
}