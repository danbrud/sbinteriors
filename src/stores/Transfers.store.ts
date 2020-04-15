// Need to edit

import { observable, action, computed } from 'mobx'
import axios from 'axios'
import { removeOptionalFields } from '../utils'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Transfers {
  @observable transfers = []


  @action async createTransfer(transfer) {
    transfer = removeOptionalFields(['foreignAmount', 'foreignAmountCurrency', 'description'], { ...transfer })
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