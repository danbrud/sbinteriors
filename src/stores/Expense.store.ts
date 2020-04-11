import { observable } from 'mobx'

export class Expense {
  @observable id: number
  @observable projectId: number
  @observable paymentMethod: string
  @observable date: Date
  @observable isPaid: boolean
  @observable amount: number

  constructor(
    id: number, projectId: number, paymentMethod: string,
    date: Date, isPaid: boolean, amount: number
  ) {
    this.id = id
    this.projectId = projectId
    this.paymentMethod = paymentMethod
    this.date = date
    this.isPaid = isPaid
    this.amount = amount
  }
}