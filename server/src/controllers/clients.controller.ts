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
    this.router.put('/:clientId', this.updateClient)
    this.router.get('/:clientId/balance/:type', this.getBalance)
    this.router.post('/:clientId/contracts', this.addContract)
    this.router.get('/:clientId/contracts', this.getContract)
  }

  private getClients: express.RequestHandler = async (req, res) => {
    const clients = await this.clientsService.getClients()
    res.send(clients)
  }

  private createClient: express.RequestHandler = async (req, res) => {
    const client = await this.clientsService.createClient(req.body)
    res.send(client)
  }

  private updateClient: express.RequestHandler = async (req, res) => {
    const { params, body } = req

    const client = await this.clientsService.updateClient(params.clientId, body)
    res.send(client)
  }

  private getBalance: express.RequestHandler = async (req, res) => {
    const { clientId, type } = req.params

    const balance = type === 'expenses'
      ? await this.clientsService.getExpenseBalance(clientId)
      : await this.clientsService.getTaskBalance(clientId)

    res.send(balance)
  }

  private addContract: express.RequestHandler = async (req, res) => {
    const contract = await this.clientsService.addContract(req.params.clientId, req.body)
    res.send({ contract })
  }

  private getContract: express.RequestHandler = async (req, res) => {
    const contract = await this.clientsService.getContract(req.params.clientId)
    res.send({ contract })
  }
}