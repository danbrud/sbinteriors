import { Client } from "../models/Client.model"
import { Transfer } from '../models/Transfer.model'
import { Task } from '../models/Task.model'
import { Expense } from '../models/Expense.model'
import sequelize, { Op } from "sequelize"
import { Contract } from "../models/Contract.model"

export class ClientsService {

  public async getClients(): Promise<Client[]> {
    const clients = await Client.findAll()
    return clients
  }

  public async createClient(body): Promise<Client> {
    const client = new Client(body)
    await client.save()

    return client
  }

  public async updateClient(clientId, body): Promise<Client> {
    const { prop, value } = body

    const client = await Client.findOne({ where: { id: clientId } })
    client[prop] = value
    client.save()

    return client
  }

  public async getExpenseBalance(clientId: string): Promise<{ balance: number }> {
    const transfers = await this.getTransfersByAccount(clientId, 'expenses', ['ilsAmount'])

    const expenses = await Expense.findAll({
      where: {
        [Op.and]: [
          { clientId: parseInt(clientId) }
        ]
      },
      attributes: ['amount']
    })

    const expenseSum = expenses.reduce((acc: number, e: Expense) => acc + e.amount, 0)
    const transferSum = transfers.reduce((acc: number, t: Transfer) => acc + t.ilsAmount, 0)
    const balance = transferSum - expenseSum

    return { balance }
  }

  public async getTaskBalance(clientId: string): Promise<{ balance: number }> {
    const transfers = await this.getTransfersByAccount(clientId, 'tasks', ['ilsAmount'])

    const tasks = await Task.findAll({
      where: {
        [Op.and]: [
          { clientId: parseInt(clientId) }
        ]
      },
      attributes: ['price']
    })

    const taskSum = tasks.reduce((acc: number, t: Task) => acc + t.price, 0)
    const transferSum = transfers.reduce((acc: number, t: Transfer) => acc + t.ilsAmount, 0)
    const balance = transferSum - taskSum

    return { balance }
  }

  private async getTransfersByAccount(
    clientId: string, account: string, attributes: string[]
  ): Promise<Transfer[]> {
    return await Transfer.findAll({
      where: {
        [Op.and]: [
          { clientId: parseInt(clientId) },
          { account }
        ]
      },
      attributes
    })
  }

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

  public async getContract(clientId: string): Promise<Contract[]> {
    const contract = Contract.findAll({
      where: {
        clientId: parseInt(clientId)
      }
    })

    return contract
  }
}