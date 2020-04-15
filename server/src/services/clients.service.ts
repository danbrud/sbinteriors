import { Client } from "../models/Client.model"

export class ClientsService {

  public async getClients(): Promise<Client[]> {
    const clients = await Client.findAll()
    return clients
  }

  public async createClient(body): Promise<Client> {
    const client = new Client(body)
    await client.save()

    return client
  }

  public async updateClient(clientId, body): Promise<Client> {
    const { prop, value } = body
    
    const client = await Client.findOne({ where: { id: clientId } })
    client[prop] = value
    return client
  }
}