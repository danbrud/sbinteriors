import { Task } from '../models/Task.model'
import { Service } from '../models/Service.model'
import { Contract } from '../models/Contract.model'
import sequelize, { Op } from "sequelize"
import { Client } from '../models/Client.model'


export class TasksService {

  public async getTasks(): Promise<Task[]> {
    const tasks = await Task.findAll()
    return tasks
  }

  public async getTasksByClientId(clientId: string): Promise<Task[]> {
    const tasks = await Task.findAll({ where: { clientId }, include: [Service] })
    return tasks
  }

  public async createTask(body): Promise<Task> {
    //Update the client's balance
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
    if (totalMinutes >= includedMinutes) {
      body.price = tasks[0].client.pricePerHour * (taskTime / 60)
    } else if (totalMinutes + taskTime > includedMinutes) {
      const leftOverTime = includedMinutes - totalMinutes
      const billableMinutes = taskTime - leftOverTime
      body.price = tasks[0].client.pricePerHour * (billableMinutes / 60)
    }

    const task = new Task(body)
    await task.save()

    return task
  }
}