import { Client } from "../models/Client.model"
import { Task } from '../models/Task.model'
import { Expense } from '../models/Expense.model'
import { Contract } from "../models/Contract.model"
import { ExpensesService } from './expenses.service'
import { TasksService } from './tasks.service'
import { TransfersService } from './transfers.service'
import { getTotal } from '../utils'

export class ClientsService {
  private expensesService = new ExpensesService()
  private transfersService = new TransfersService()
  private tasksService = new TasksService()

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

  public async getBalanceByAccount(clientId: string, account: 'expenses' | 'tasks'): Promise<{ balance: number }> {
    const transfers = await this.transfersService.getTransfersByClientId(clientId, ['ilsAmount'], [{ account }])

    let items: Expense[] | Task[]
    if (account === 'expenses') {
      items = await this.expensesService.getExpensesByClientId(clientId, ['amount'])
    } else {
      items = await this.tasksService.getTasksByClientId(clientId, ['price'])
    }

    const itemTotal = getTotal(items)
    const transferTotal = getTotal(transfers)
    const balance = transferTotal - itemTotal

    return { balance }
  }

  public async addContract(clientId: string, body): Promise<Contract[]> {
    const contract = []
    for (let key in body) {
      const contractItem = new Contract({
        clientId, serviceId: key, includedHours: body[key]
      })
      await contractItem.save()
      contract.push(contractItem)
    }

    return contract
  }

  public async getContract(clientId: string): Promise<Contract[]> {
    const contract = Contract.findAll({ where: { clientId } })
    return contract
  }
}