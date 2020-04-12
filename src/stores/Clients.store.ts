import { observable, action, computed } from 'mobx'
import { Client } from './Client.store'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Clients {
  @observable clients: Client[] = []

  @action async getClientsFromDB() {
    const response = await axios.get<Client[]>(`${SERVER_URL}/clients`)
    const clients = response.data.map(c => (
      new Client(c.id, c.firstName, c.lastName, c.email, c.phone, c.balance, c.spouseName)
    ))
    this.clients = clients
  }

  @action async addClient(client) {
    const { data } = await axios.post<Client>(`${SERVER_URL}/clients`, client)
    const newClient = new Client(data.id, data.firstName, data.lastName, data.email, data.phone, data.balance, data.spouseName)
    this.clients.push(newClient)
  }

  getClient(id: string) {
    const parsedId = parseInt(id)
    const client = this.clients.find(client => client.id === parsedId)
    return client
  }

  @computed get isPopulated() {
    return !!this.clients.length
  }
}