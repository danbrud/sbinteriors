import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Project } from './Project.model'

@Table
export class Task extends Model<Task> {

  @ForeignKey(() => Project)
  @Column
  projectId: number

  @Column
  type: string

  @Column
  startTime: Date

  @Column
  endTime: Date

  @Column({ type: DataType.FLOAT })
  price: number

  @Column
  description: string

  @BelongsTo(() => Project)
  project: Project
}