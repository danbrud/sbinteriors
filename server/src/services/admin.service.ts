import { Service } from '../models/Service.model'
import { TransferMethod } from '../models/TransferMethod.model'

export class AdminService {

  public async getServices(): Promise<Service[]> {
    const services = await Service.findAll()
    return services
  }

  public async createService(body): Promise<Service> {
    const service = new Service(body)
    await service.save()

    return service
  }

  public async createTransferMethod(body): Promise<TransferMethod> {
    const transferMethod = new TransferMethod(body)
    await transferMethod.save()

    return transferMethod
  }

  public async getTransferMethods(): Promise<TransferMethod[]> {
    const transferMethods = await TransferMethod.findAll()
    return transferMethods
  }
}