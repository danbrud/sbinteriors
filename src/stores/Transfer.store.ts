import { observable } from 'mobx'
import { adminType } from '../adminTypes'

export class Transfer {
  @observable id: number
  @observable clientId: number
  @observable date: Date
  @observable ilsAmount: number
  @observable foreignAmount: number | null
  @observable foreignAmountCurrency: string | null
  @observable transferMethod: adminType
  @observable description: string | null
  @observable account: 'expenses' | 'tasks'

  constructor(
    id: number, clientId: number, date: Date, ilsAmount: number,
    foreignAmount: number | null, foreignAmountCurrency: string | null,
    transferMethod: adminType, description: string | null, account: 'expenses' | 'tasks'
  ) {
    this.id = id
    this.clientId = clientId
    this.date = new Date(date)
    this.ilsAmount = ilsAmount
    this.foreignAmount = foreignAmount
    this.foreignAmountCurrency = foreignAmountCurrency
    this.transferMethod = transferMethod
    this.description = description
    this.account = account
  }
}