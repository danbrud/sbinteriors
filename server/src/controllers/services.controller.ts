import express from 'express'
import { ServicesService } from '../services/services.service'


export class ServicesController {
  private servicesService = new ServicesService()
  public path = 'services'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.get('/', this.getServices)
    this.router.post('/', this.createService)
  }

  private getServices: express.RequestHandler = async (req, res) => {
    const services = await this.servicesService.getServices()
    res.send(services)
  }

  private createService: express.RequestHandler = async (req, res) => {
    const service = await this.servicesService.createService(req.body)
    res.send(service)
  }
}