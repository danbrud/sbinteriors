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

  getClient(id: string) {
    const parsedId = parseInt(id)
    const client = this.clients.find(client => client.id === parsedId)
    return client
  }

  @computed get isPopulated() {
    return !!this.clients.length
  }
}