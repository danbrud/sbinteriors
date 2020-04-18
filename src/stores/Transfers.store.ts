import { observable, action, computed } from 'mobx'
import axios from 'axios'
import { removeOptionalFields } from '../utils'
import { Transfer } from './Transfer.store'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Transfers {
  @observable transfers: Transfer[] = []

  @action async getTransfersFromDB(clientId: string) {
    const { data } = await axios.get<Transfer[]>(`${SERVER_URL}/transfers/${clientId}`)
    const transfers = data.map(t => (
      new Transfer(
        t.id, t.clientId, t.date, t.ilsAmount, t.foreignAmount,
        t.foreignAmountCurrency, t.transferMethod, t.description
      )
    ))
    this.transfers = transfers
  }

  async createTransfer(transfer) {
    transfer = removeOptionalFields(
      ['foreignAmount', 'foreignAmountCurrency', 'description'], { ...transfer }
    )
    await axios.post(`${SERVER_URL}/transfers`, transfer)
  }

  @action clearStore() {
    this.transfers = []
  }

  @computed get isPopulated() {
    return !!this.transfers.length
  }
}

export const TransfersStore = new Transfers()