import express from 'express'
import { ClientsService } from '../services/clients.service'


export class ClientsController {
  private clientsService = new ClientsService()
  public path = 'clients'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.get('/', this.getClients)
    this.router.post('/', this.createClient)
  }

  private getClients: express.RequestHandler = async (req, res) => {
    const clients = await this.clientsService.getClients()
    res.send(clients)
  }

  private createClient: express.RequestHandler = async (req, res) => {
    const client = await this.clientsService.createClient(req.body)
    res.send(client)
  }
}