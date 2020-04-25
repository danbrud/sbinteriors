import { Task } from '../models/Task.model'
import { Service } from '../models/Service.model'
import { Contract } from '../models/Contract.model'
import { Op } from "sequelize"
import { Client } from '../models/Client.model'


export class TasksService {

  public async getTasks(): Promise<Task[]> {
    const tasks = await Task.findAll()
    return tasks
  }

  public async getTasksByClientId(clientId: string, attributes?: string[]): Promise<Task[]> {
    const options = attributes
      ? { where: { clientId }, attributes }
      : { where: { clientId }, include: [Service] }

    const tasks = await Task.findAll(options)
    return tasks
  }

  public async createTask(body): Promise<Task> {
    const { serviceTypeId, clientId } = body
    const { includedHours } = await Contract.findOne({
      where: {
        [Op.and]: [
          { clientId },
          { serviceId: serviceTypeId }
        ]
      }
    })

    const tasks = await Task.findAll({
      where: {
        [Op.and]: [
          { clientId },
          { serviceTypeId }
        ]
      },
      attributes: ['startTime', 'endTime', 'price'],
      include: [Client]
    })

    const totalTime = tasks.reduce((acc, t) => acc + (+t.endTime - +t.startTime), 0)
    const totalMinutes = Math.floor((totalTime / 1000) / 60)
    const includedMinutes = includedHours * 60

    body.endTime = new Date(body.endTime)
    body.startTime = new Date(body.startTime)
    const taskTime = Math.floor(((+body.endTime - +body.startTime) / 1000) / 60)

    //put in function and call inside if
    let client
    if (tasks.length) {
      client = tasks[0].client
    } else {
      client = await Client.findOne({
        where: {
          id: clientId
        },
        attributes: ['pricePerHour']
      })
    }

    if (totalMinutes >= includedMinutes) {
      body.price = client.pricePerHour * (taskTime / 60)
    } else if (totalMinutes + taskTime > includedMinutes) {
      const leftOverTime = includedMinutes - totalMinutes
      const billableMinutes = taskTime - leftOverTime
      body.price = client.pricePerHour * (billableMinutes / 60)
    }

    const task = new Task(body)
    await task.save()

    return task
  }
}