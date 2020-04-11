import { observable } from 'mobx'

export class Task {
  @observable id: number
  @observable projectId: number
  @observable type: string
  @observable startTime: Date
  @observable endTime: Date
  @observable price: number
  @observable description: string

  constructor(
    id: number, projectId: number, type: string, startTime: Date,
    endTime: Date, price: number, description: string
  ) {
    this.id = id
    this.projectId = projectId
    this.type = type
    this.startTime = startTime
    this.endTime = endTime
    this.price = price
    this. description = description
  }
}