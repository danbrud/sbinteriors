import { observable, action, computed } from "mobx"
import { Client } from "./Client.store"
import axios from 'axios'
import { SERVER_URL } from "../utils/utils"


export class User {
  @observable id: number
  @observable clientId: number | null
  @observable role: 'USER' | 'ADMIN'
  @observable client: Client

  @action async getClient() {
    const { data } = await axios.get<Client>(`${SERVER_URL}/clients/${this.clientId}`)
    const client = new Client(
      data.id, data.name, data.email, data.phone, data.spouseName,
      data.address, data.city, data.description, data.isComplete
    )

    this.client = client
  }

  @action setUser(user) {
    this.id = user.id
    this.clientId = user.clientId
    this.role = user.role

    if (!this.isAdmin) {
      this.getClient()
    }
  }

  @computed get isAdmin() {
    return this.role === 'ADMIN'
  }

  async updatePassword(password: string) {
    await axios.put(`${SERVER_URL}/clients/user/${this.id}/password`, { password })
  }
}

export const UserStore = new User()