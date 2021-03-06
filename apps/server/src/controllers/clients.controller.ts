import express from 'express'
import { ClientsService } from '../services/clients.service'
import { Client } from '../models/Client.model'


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
    this.router.get('/:clientId', this.getClientById)
    this.router.put('/:clientId', this.updateClient)
    this.router.get('/:clientId/balance/:account', this.getBalance)
    this.router.post('/:clientId/contracts', this.addContract)
    this.router.post('/user/admin', this.addAdminUser)
    this.router.get('/:clientId/contracts', this.getContract)
    this.router.put('/:clientId/contracts', this.updateContract)
    this.router.get('/:clientId/report', this.generateReport)
    this.router.put('/user/:userId/password', this.updatePassword)
  }

  private getClients: express.RequestHandler = async (req, res) => {
    const clients = await this.clientsService.getClients()
    res.send(clients)
  }

  private createClient: express.RequestHandler = async (req, res) => {
    const client = await this.clientsService.createClient(req.body)
    res.send(client)
  }

  private getClientById: express.RequestHandler = async (req, res) => {
    const client = await this.clientsService.getClientById(req.params.clientId)
    res.send(client)
  }

  private updateClient: express.RequestHandler = async (req, res) => {
    const { params, body } = req

    const client = await this.clientsService.updateClient(params.clientId, body)
    res.send(client)
  }

  private getBalance: express.RequestHandler = async (req, res) => {
    const { clientId, account } = req.params
    const balance = await this.clientsService.getBalanceByAccount(clientId, account as 'expenses' | 'tasks')

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

  private updateContract: express.RequestHandler = async (req, res) => {
    const contractItem = await this.clientsService.updateContract(req.body)
    res.send(contractItem)
  }

  private generateReport: express.RequestHandler = async (req, res) => {
    const success = await this.clientsService.generateReport(req.params.clientId)
    res.send({ success })
  }

  private addAdminUser: express.RequestHandler = async (req, res) => {
    const { email, password } = req.body

    await this.clientsService.createUser({ email } as Client, password, true)
    res.send({ success: true })
  }

  private updatePassword: express.RequestHandler = async (req, res) => {
    const response = await this.clientsService.updatePassword(req.params.userId, req.body)
    res.send(response)
  }
}