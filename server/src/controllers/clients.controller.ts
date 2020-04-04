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
    const response = await this.clientsService.getClients()
    res.send(response)
  }

  private createClient: express.RequestHandler = async (req, res) => {
    const response = await this.clientsService.createClient(req.body)
    res.send(response)
  }
}