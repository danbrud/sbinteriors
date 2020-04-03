import { observable, action } from 'mobx'
import { Client } from './Client.store'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class AppState {
  @observable clients: Client[] = []

  @action async getClients() {
    const response = await axios.get<Client[]>(`${SERVER_URL}/clients`)
    const clients = response.data.map(c => new Client(c.name))
    this.clients = clients
  }
}