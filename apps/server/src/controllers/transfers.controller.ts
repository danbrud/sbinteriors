import express from 'express'
import { TransfersService } from '../services/transfers.service'


export class TransfersController {
  private transfersService = new TransfersService()
  public path = 'transfers'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.get('/', this.getTransfers)
    this.router.get('/:clientId', this.getTransfersByClientId)
    this.router.post('/', this.createTransfer)
    this.router.post('/balances', this.createBalanceTransfer)
    this.router.get('/:clientId/balances', this.getBalanceTransfersByClientId)
    this.router.put('/:transferId', this.updateTransfer)
  }

  private getTransfers: express.RequestHandler = async (req, res) => {
    const transfers = await this.transfersService.getTransfers()
    res.send(transfers)
  }

  private getTransfersByClientId: express.RequestHandler = async (req, res) => {
    const { clientId } = req.params

    const transfers = await this.transfersService.getTransfersByClientId(clientId)
    res.send(transfers)
  }

  private createTransfer: express.RequestHandler = async (req, res) => {
    const transfer = await this.transfersService.createTransfer(req.body)
    res.send(transfer)
  }

  private createBalanceTransfer: express.RequestHandler = async (req, res) => {
    const balanceTransfer = await this.transfersService.createBalanceTransfer(req.body)
    res.send(balanceTransfer)
  }

  private getBalanceTransfersByClientId: express.RequestHandler = async (req, res) => {
    const { clientId } = req.params

    const balanceTransfers = await this.transfersService.getBalanceTransfersByClientId(clientId)
    res.send(balanceTransfers)
  }

  private updateTransfer: express.RequestHandler = async (req, res) => {
    const { transferId } = req.params

    const transfer = await this.transfersService.updateTransfer(transferId, req.body)
    res.send(transfer)
  }
}