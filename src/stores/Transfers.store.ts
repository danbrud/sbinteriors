// Need to edit

import { observable, action, computed } from 'mobx'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Transfers {
  @observable projects = []

  @action clearStore() {
    this.projects = []
  }

  @computed get isPopulated() {
    return !!this.projects.length
  }
}

export const TransfersStore = new Transfers()