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
    // this.router.post(this.path, )
  }

  private getClients: express.RequestHandler = (req, res) => {
    const response = this.clientsService.getClients()
    res.send(response)
  }

  // createClient: express.RequestHandler = (request, response) => {

  // }
}