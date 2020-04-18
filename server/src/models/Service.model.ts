import { Table, Column, Model } from 'sequelize-typescript'
// import { Client } from './Client.model'

@Table
export class Service extends Model<Service> {

  // @ForeignKey(() => Client)
  // @Column
  // clientId: number

  @Column
  name: string



  // @BelongsTo(() => Client)
  // project: Client
}