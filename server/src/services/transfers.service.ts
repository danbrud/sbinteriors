import { Transfer } from '../models/Transfer.model'
import { TransferMethod } from '../models/TransferMethod.model'
import { Op } from "sequelize"

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
}