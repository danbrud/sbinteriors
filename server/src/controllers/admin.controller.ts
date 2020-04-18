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
  }

  private getServices: express.RequestHandler = async (req, res) => {
    const services = await this.adminService.getServices()
    res.send(services)
  }

  private createService: express.RequestHandler = async (req, res) => {
    const service = await this.adminService.createService(req.body)
    res.send(service)
  }
}