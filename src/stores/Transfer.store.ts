import { observable } from 'mobx'

export class Transfer {
  @observable id: number
  @observable clientId: number
  @observable date: Date
  @observable ilsAmount: number
  @observable foreignAmount: number | null
  @observable foreignAmountCurrency: string | null
  @observable transferMethod: string
  @observable description: string | null

  constructor(
    id: number, clientId: number, date: Date, ilsAmount: number, foreignAmount: number | null,
    foreignAmountCurrency: string | null, transferMethod: string, description: string | null
  ) {
    this.id = id
    this.clientId = clientId
    this.date = new Date(date)
    this.ilsAmount = ilsAmount
    this.foreignAmount = foreignAmount
    this.foreignAmountCurrency = foreignAmountCurrency
    this.transferMethod = transferMethod
    this.description = description
  }
}