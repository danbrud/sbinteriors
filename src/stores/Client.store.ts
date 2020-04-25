import { observable, action, computed } from 'mobx'
import axios from 'axios'
import { toProperCase } from '../utils'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Client {
  @observable id: number
  @observable name: string
  @observable email: string
  @observable phone: string
  @observable spouseName: string | null
  @observable address: string
  @observable city: string
  @observable description: string | null
  @observable expensesBalance: number
  @observable tasksBalance: number
  @observable isComplete: boolean

  constructor(
    id: number, name: string, email: string, phone: string, spouseName: string | null,
    address: string, city: string, description: string | null, isComplete: boolean
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.phone = phone
    this.spouseName = spouseName
    this.address = address
    this.city = city
    this.description = description
    this.isComplete = isComplete
    this.getBalance('expenses')
    this.getBalance('tasks')
  }

  @action async updateClient(prop: string, value: string | boolean | number) {
    await axios.put(`${SERVER_URL}/clients/${this.id}`, { prop, value })
    this[prop] = value
  }

  @computed get formattedName() {
    let formattedName = ''
    const splitName = this.name.split(' ')
    splitName.forEach((n, i) => {
      formattedName += toProperCase(n)
      if (i !== splitName.length - 1) {
        formattedName += ' '
      }
    })

    return formattedName
  }

  @action async getBalance(type: 'expenses' | 'tasks') {
    const { data } = await axios.get<{ balance: number }>(`${SERVER_URL}/clients/${this.id}/balance/${type}`)
    type += 'Balance'
    this[type] = data.balance
  }

  async addContract(contract) {
    await axios.post(`${SERVER_URL}/clients/${this.id}/contracts`, contract)
  }
}