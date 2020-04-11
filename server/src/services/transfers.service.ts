import { Transfer } from '../models/Transfer.model'

export class TransfersService {

  public async getTransfers(): Promise<Transfer[]> {
    const transfers = await Transfer.findAll()
    return transfers
  }

  public async getTransfersByClientId(clientId: string): Promise<Transfer[]> {
    const transfers = await Transfer.findAll({ where: { clientId } })
    return transfers
  }

  public async createTransfer(body): Promise<Transfer | { error: string }> {
    try {
      //Make sure to update client balance
      const transfer = new Transfer(body)
      await transfer.save()

      return transfer
    } catch (e) {
      return { error: 'Must have a valid client id' }
    }
  }
}