import { Contract } from '../models/Contract.model'

export class ContractsService {

  public async addContract(clientId: string, body): Promise<Contract[]> {
    const contract = []
    for (let key in body) {
      const contractItem = new Contract({
        clientId: parseInt(clientId),
        serviceId: parseInt(key),
        includedHours: body[key]
      })
      
      await contractItem.save()
      contract.push(contractItem)
    }

    return contract
  }
}