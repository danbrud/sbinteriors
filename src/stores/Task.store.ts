import { observable, computed, action } from 'mobx'
import { adminType } from '../adminTypes'
import axios from 'axios'
import { SERVER_URL } from '../utils/utils'
import { GeneralAdminStore } from './GeneralAdmin'

export class Task {
  @observable id: number
  @observable clientId: number
  @observable serviceType: adminType
  @observable startTime: Date
  @observable endTime: Date
  @observable price: number
  @observable description: string | null

  constructor(
    id: number, clientId: number, serviceType: adminType, startTime: Date,
    endTime: Date, price: number, description: string | null
  ) {
    this.id = id
    this.clientId = clientId
    this.serviceType = serviceType
    this.startTime = new Date(startTime)
    this.endTime = new Date(endTime)
    this.price = price
    this.description = description
  }

  @computed get durationInMinutes() {
    const { startTime, endTime } = this
    const duration = +endTime - +startTime
    return Math.floor((duration / 1000) / 60)
  }

  @action async updateTask(prop: string, value: string | boolean | number) {
    await axios.put(`${SERVER_URL}/tasks/${this.id}`, { prop, value })
    if (prop === 'serviceTypeId') {
      const serviceType = GeneralAdminStore.getService(value as number)
      this.serviceType = serviceType
    } else {
      this[prop] = value
    }
  }
}