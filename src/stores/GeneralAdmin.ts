import { observable, action } from "mobx"
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL


export class GeneralAdmin {
  @observable services: { id: number, name: string }[] = []
  @observable availableTransferMethods = []

  @action async getServicesFromDB() {
    const { data } = await axios.get<{ id: number, name: string }[]>(`${SERVER_URL}/admin/services`)
    this.services = data
  }

  @action async addService(name: string) {
    const { data } = await axios.post<{ id: number, name: string }>(`${SERVER_URL}/admin/services`, { name })
    this.services.push(data)
  }
}

export const GeneralAdminStore = new GeneralAdmin()