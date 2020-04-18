import { Service } from '../models/Service.model'

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
}