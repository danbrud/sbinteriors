import { observable } from 'mobx'
// import axios from 'axios'
// const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Project {
  @observable id: number
  @observable clientId: number
  @observable name: string
  @observable address: string
  @observable city: string
  @observable description: string
  @observable isComplete: boolean


  constructor(
    id: number, clientId: number, name: string, address: string,
    city: string, description: string, isComplete: boolean
  ) {
    this.id = id
    this.clientId = clientId
    this.name = name
    this.address = address
    this.city = city
    this.description = description
    this.isComplete = isComplete
  }

  
}