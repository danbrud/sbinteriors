import { observable, action, computed } from 'mobx'
import { Client } from './Client.store'
import axios from 'axios'
import { Project } from './Project.store'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Clients {
  @observable clients: Client[] = []

  @action async getClientsFromDB() {
    const { data } = await axios.get<Client[]>(`${SERVER_URL}/clients`)

    const clients = data.map(c => {
      const projects = c.projects.map(p => new Project(p.id, p.clientId, p.name, p.address, p.city, p.description, p.isComplete))
      return new Client(c.id, c.firstName, c.lastName, c.email, c.phone, c.balance, projects, c.spouseName)
    })
    this.clients = clients
  }

  @action async addClient(client, project) {
    if (!client.spouseName) { client.spouseName = null }

    const { data } = await axios.post<Client>(`${SERVER_URL}/clients`, client)
    const newClient = new Client(data.id, data.firstName, data.lastName, data.email, data.phone, data.balance, [], data.spouseName)
    this.clients.push(newClient)

    await newClient.addProject(project)
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

  getClientByFullName(name: string): Client {
    const [firstName, lastName] = name.split(' ')
    const client = this.clients.find(c => c.firstName === firstName && c.lastName === lastName)
    return client
  }
}