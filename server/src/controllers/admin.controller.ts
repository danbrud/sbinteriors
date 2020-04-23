import express from 'express'
import { AdminService } from '../services/admin.service'


export class AdminController {
  private adminService = new AdminService()
  public path = 'admin'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.get('/services', this.getServices)
    this.router.post('/services', this.createService)
    this.router.get('/transfer-methods', this.getTransferMethods)
    this.router.post('/transfer-methods', this.createTransferMethod)
    this.router.get('/transfer-methods', this.getTransferMethods)
  }

  private getServices: express.RequestHandler = async (req, res) => {
    const services = await this.adminService.getServices()
    res.send(services)
  }

  private createService: express.RequestHandler = async (req, res) => {
    const service = await this.adminService.createService(req.body)
    res.send(service)
  }

  private createTransferMethod: express.RequestHandler = async (req, res) => {
    const trasnferMethod = await this.adminService.createTransferMethod(req.body)
    res.send(trasnferMethod)
  }

  private getTransferMethods: express.RequestHandler = async (req, res) => {
    const transferMethods = await this.adminService.getTransferMethods()
    res.send(transferMethods)
  }
}