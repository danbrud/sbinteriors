import { observable, action } from "mobx"
import axios from 'axios'
import { adminType } from '../adminTypes'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class GeneralAdmin {
  @observable services: adminType[] = []
  @observable transferMethods: adminType[] = []

  @action async getServicesFromDB() {
    const { data } = await axios.get<adminType[]>(`${SERVER_URL}/admin/services`)
    this.services = data
  }

  @action async addService(name: string) {
    const { data } = await axios.post<adminType>(`${SERVER_URL}/admin/services`, { name })
    this.services.push(data)
  }

  getService(id: number | string) {
    const service = this.services.find(s => s.id == id)
    return service
  }

  @action async getTransferMethodsFromDB() {
    const { data } = await axios.get<adminType[]>(`${SERVER_URL}/admin/transfer-methods`)
    this.transferMethods = data
  }

  @action async addTransferMethod(name: string) {
    const { data } = await axios.post<adminType>(`${SERVER_URL}/admin/transfer-methods`, { name })
    this.transferMethods.push(data)
  }

  getTransferMethod(id: number | string) {
    const transferMethod = this.transferMethods.find(m => m.id == id)
    return transferMethod
  }
}

export const GeneralAdminStore = new GeneralAdmin()