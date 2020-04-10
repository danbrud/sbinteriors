import { observable } from 'mobx'

export class Client {
  @observable id: number
  @observable firstName: string
  @observable lastName: string
  @observable email: string
  @observable phone: string
  @observable balance: number
  @observable spouseName: string | null

  constructor(
    id: number, firstName: string, lastName: string, email: string,
    phone: string, balance: number, spouseName?: string
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.balance = balance
    this.spouseName = spouseName ? spouseName : null
  }

  
}