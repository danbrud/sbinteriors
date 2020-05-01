import { observable, action, computed } from 'mobx'
import axios from 'axios'
import { removeOptionalFields } from '../utils'
import { Transfer } from './Transfer.store'
import { SERVER_URL } from '../utils'
import { BalanceTransfer } from './BalanceTransfer.store'

export class Transfers {
  @observable transfers: Transfer[] = []
  @observable balanceTransfers: BalanceTransfer[] =[]

  @action async getTransfersFromDB(clientId: string) {
    const { data } = await axios.get<Transfer[]>(`${SERVER_URL}/transfers/${clientId}`)
    const transfers = data.map(t => (
      new Transfer(
        t.id, t.clientId, t.date, t.ilsAmount, t.foreignAmount,
        t.foreignAmountCurrency, t.transferMethod, t.description, t.account
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

  @action async getBalanceTransfersFromDB(clientId: string) {
    const { data } = await axios.get<BalanceTransfer[]>(`${SERVER_URL}/transfers/${clientId}/balances`)
    const balanceTransfers = data.map(t => new BalanceTransfer(
      t.id, t.clientId, t.date, t.fromAccount, t.toAccount, t.amount
    ))
    this.balanceTransfers = balanceTransfers
  }

  async createBalanceTransfer(balanceTransfer) {
    await axios.post(`${SERVER_URL}/transfers/balances`, balanceTransfer)
  }

  @action clearStore() {
    this.transfers = []
    this.balanceTransfers = []
  }

  @computed get isFullyPopulated() {
    return this.isTransfersPopulated || this.isBalanceTransfersPopulated
  }

  @computed get isTransfersPopulated() {
    return !!this.transfers.length
  }

  @computed get isBalanceTransfersPopulated() {
    return !!this.balanceTransfers.length
  }
}

export const TransfersStore = new Transfers()