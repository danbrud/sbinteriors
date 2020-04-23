import express from 'express'
import { ContractService } from '../services/contract.service'


export class ContractController {
  private contractService = new ContractService
  public path = 'admin'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    // this.router.get('/balance/:type', this.getBalance)
  }

  // private getBalance: express.RequestHandler = async (req, res) => {
  //   const { type } = req.params
  //   const balance = type === 'expense'
  //     ? await this.contractService.getExpenseBalance()
  //     : await this.contractService.getTaskBalance()

  //   res.send(balance)
  // }
}