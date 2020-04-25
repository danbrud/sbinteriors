import express from 'express'
import { ContractsService } from '../services/contracts.service'


export class ContractController {
  private contractsService = new ContractsService()
  public path = 'contracts'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.post('/:clientId', this.addContract)
  }

  private addContract: express.RequestHandler = async (req, res) => {
    const contract = await this.contractsService.addContract(req.params.clientId, req.body)
    res.send({ contract })
  }
}