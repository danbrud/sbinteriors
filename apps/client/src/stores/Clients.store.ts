import { observable, action, computed } from 'mobx'
import { Client } from './Client.store'
import axios from 'axios'
import { removeOptionalFields, trimValues } from '../utils/utils'
import { SERVER_URL } from '../utils/utils'

export class Clients {
  @observable clients: Client[] = []

  @action async getClientsFromDB() {
    const { data } = await axios.get<Client[]>(`${SERVER_URL}/clients`)
    const clients = data.map(c => (
      new Client(
        c.id, c.name, c.email, c.phone, c.spouseName,
        c.address, c.city, c.description, c.isComplete, c.pricePerHour
      )
    ))
    this.clients = clients
  }

  @action async addClient(client) {
    client = removeOptionalFields(['spouseName', 'phone', 'description'], { ...client })
    client = trimValues({ ...client })

    const { data } = await axios.post<Client>(`${SERVER_URL}/clients`, client)
    const newClient = new Client(
      data.id, data.name, data.email, data.phone, data.spouseName,
      data.address, data.city, data.description, data.isComplete, null
    )
    this.clients.push(newClient)
  }

  getClient(id: string | number) {
    if (typeof id === 'string') {
      id = parseInt(id)
    }
    const client = this.clients.find(client => client.id === id)
    return client
  }

  @computed get isPopulated() {
    return !!this.clients.length
  }

  getClientByName(name: string): Client {
    const client = this.clients.find(c => c.name.toLowerCase() === name.toLowerCase())
    return client
  }

  @action clearStore() {
    this.clients = []
  }
}

export const ClientsStore = new Clients()