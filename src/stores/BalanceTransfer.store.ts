import { observable } from 'mobx'
import { adminType } from '../adminTypes'

export class BalanceTransfer {
  @observable id: number
  @observable clientId: number
  @observable date: Date
  @observable fromAccount: 'expenses' | 'tasks'
  @observable toAccount: 'expenses' | 'tasks'
  @observable amount: number

  constructor(
    id: number, clientId: number, date: Date, fromAccount: 'expenses' | 'tasks',
    toAccount: 'expenses' | 'tasks', amount: number
  ) {
    this.id = id
    this.clientId = clientId
    this.date = new Date(date)
    this.fromAccount = fromAccount
    this.toAccount = toAccount
    this.amount = amount
  }
}