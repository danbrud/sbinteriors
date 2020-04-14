import { Client } from "../models/Client.model"
import { Project } from "../models/Project.model"

export class ClientsService {

  public async getClients(): Promise<Client[]> {
    const clients = await Client.findAll({ include: [Project] })
    return clients
  }

  public async createClient(body): Promise<Client> {
    const client = new Client(body)
    await client.save()

    return client
  }
}