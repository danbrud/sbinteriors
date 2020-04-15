import { observable } from 'mobx'

export class Expense {
  @observable id: number
  @observable clientId: number
  @observable name: string
  @observable date: Date
  @observable amount: number
  @observable description: string | null

  constructor(id: number, clientId: number, name: string, date: Date, amount: number, description: string | null) {
    this.id = id
    this.clientId = clientId
    this.name = name
    this.date = date
    this.amount = amount
    this.description = description
  }
}