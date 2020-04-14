import { observable, action, computed } from 'mobx'
import { Project } from '../not-used/Project.store'
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
  @observable description: string
  @observable balance: number
  @observable isComplete: boolean

  constructor(
    id: number, name: string, email: string, phone: string, spouseName: string,
    address: string, city: string, description: string, balance: number, isComplete: boolean
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.phone = phone
    this.spouseName = spouseName
    this.address = address
    this.city = city
    this.description = description
    this.balance = balance
    this.isComplete = isComplete
  }

  @action async updateClient(prop: string, value: string) {
    await this.updateClientInDB(prop, value)
    this[prop] = value
  }

  async updateClientInDB(prop: string, value: string) {
    //Make http request to update client
    console.log(prop, value)
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
}