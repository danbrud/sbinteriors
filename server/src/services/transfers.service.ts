import { Transfer } from '../models/Transfer.model'
import { Client } from '../models/Client.model'
import { TransferMethod } from '../models/TransferMethod.model'

export class TransfersService {

  public async getTransfers(): Promise<Transfer[]> {
    const transfers = await Transfer.findAll()
    return transfers
  }

  public async getTransfersByClientId(clientId: string): Promise<Transfer[]> {
    const transfers = await Transfer.findAll({ where: { clientId }, include: [TransferMethod] })
    return transfers
  }

  public async createTransfer(body): Promise<Transfer> {
    const transfer = new Transfer(body)
    await transfer.save()

    return transfer
  }
}