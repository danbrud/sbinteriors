import { observable, computed } from 'mobx'
import { adminType } from '../adminTypes'

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
    this. description = description
  }

  @computed get duration() {
    const { startTime, endTime } = this
    const hours = endTime.getHours() - startTime.getHours()
    const minutes = endTime.getMinutes() - startTime.getMinutes()

    // const duration: string = (hours ? `${hours} hours ` : '') + (minutes ? `${minutes} minutes ` : '')
    const duration = `${hours}:${minutes || '00'}`
    return duration
  }
}