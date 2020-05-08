import { Task } from '../models/Task.model'
import { Op } from "sequelize"
import { Client } from '../models/Client.model'
import { ContractsService } from './contracts.service'
import { ClientsService } from './clients.service'


export class TasksService {

  public async getTasks(): Promise<Task[]> {
    const tasks = await Task.findAll()
    return tasks
  }

  public async getTasksByClientId(clientId: string, include?, attributes?: string[], where?): Promise<Task[]> {
    where = where ? where : []
    const tasks = await Task.findAll({
      where: {
        [Op.and]: [
          { clientId },
          ...where
        ]
      },
      attributes,
      include
    })
    return tasks
  }

  public async createTask(body): Promise<Task> {
    const { serviceTypeId, clientId } = body

    const contractsService = new ContractsService()
    const { includedHours } = await contractsService.getContractByClientId(
      clientId, [{ serviceId: serviceTypeId }]
    )
    const tasks = await this.getTasksByClientId(
      clientId, [Client], ['startTime', 'endTime', 'price'], [{ serviceTypeId }]
    )

    const clientsService = new ClientsService()
    const client = tasks.length
      ? tasks[0].client
      : await clientsService.getClientById(clientId, ['pricePerHour'])

    body.price = this.getTotalBillablePrice(tasks, includedHours, client.pricePerHour, body)
    const task = new Task(body)
    await task.save()

    return task
  }

  private getTotalBillablePrice(tasks: Task[], includedHours: number, pricePerHour: number, body): number {
    const taskTime = this.getDurationInMinutes(+new Date(body.endTime) - +new Date(body.startTime))
    const includedMinutes = includedHours * 60

    const totalTimeOfTasks = tasks.reduce((acc, t) => acc + (+t.endTime - +t.startTime), 0)
    const totalMinutesOfTasks = this.getDurationInMinutes(totalTimeOfTasks)

    let price = 0
    if (totalMinutesOfTasks >= includedMinutes) {
      price = pricePerHour * (taskTime / 60)
    } else if (totalMinutesOfTasks + taskTime > includedMinutes) {
      const leftOverTime = includedMinutes - totalMinutesOfTasks
      const billableMinutes = taskTime - leftOverTime
      price = pricePerHour * (billableMinutes / 60)
    }

    return price
  }

  private getDurationInMinutes(duration: number): number {
    return Math.floor((duration / 1000) / 60)
  }

  public async updateTask(taskId: string, body): Promise<Task> {
    const { prop, value } = body
    const task = await Task.findOne({ where: { id: taskId } })
    task[prop] = value
    await task.save()

    return task
  }
}