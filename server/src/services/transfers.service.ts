import { Transfer } from '../models/Transfer.model'
import { TransferMethod } from '../models/TransferMethod.model'
import { Op } from "sequelize"
import { BalanceTransfer } from '../models/BalanceTransfer.model'

export class TransfersService {

  public async getTransfers(): Promise<Transfer[]> {
    const transfers = await Transfer.findAll()
    return transfers
  }

  public async getTransfersByClientId(clientId: string, attributes?: string[], where?): Promise<Transfer[]> {
    const options = attributes
      ? { where: {
          [Op.and]: [
            { clientId },
            ...where
          ]
        },
        attributes
      }
      : { where: { clientId }, include: [TransferMethod] }

    const transfers = await Transfer.findAll(options)
    return transfers
  }

  public async createTransfer(body): Promise<Transfer> {
    const transfer = new Transfer(body)
    await transfer.save()

    return transfer
  }

  public async createBalanceTransfer(body): Promise<BalanceTransfer> {
    const balanceTransfer = new BalanceTransfer(body)
    await balanceTransfer.save()

    return balanceTransfer
  }

  public async getBalanceTransfersByClientId(clientId: string, attributes?: string[], where?): Promise<BalanceTransfer[]> {
    const options = attributes
      ? { where: {
          [Op.and]: [
            { clientId },
            ...where
          ]
        },
        attributes
      }
      : { where: { clientId } }

    const balanceTransfers = await BalanceTransfer.findAll(options)
    return balanceTransfers
  }
}