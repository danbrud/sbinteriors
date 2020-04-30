import { Client } from "../models/Client.model"
import { Task } from '../models/Task.model'
import { Expense } from '../models/Expense.model'
import { Contract } from "../models/Contract.model"
import { ExpensesService } from './expenses.service'
import { TasksService } from './tasks.service'
import { TransfersService } from './transfers.service'
import { getTotal } from '../utils'

export class ClientsService {

  public async getClients(): Promise<Client[]> {
    const clients = await Client.findAll()
    return clients
  }

  public async getClientById(id: number, attributes?: string[]): Promise<Client> {
    const client = await Client.findOne({ where: { id }, attributes })
    return client
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
    const expensesService = new ExpensesService()
    const transfersService = new TransfersService()
    const tasksService = new TasksService()

    const transfers = await transfersService.getTransfersByClientId(clientId, ['ilsAmount'], [{ account }])
    const balanceTransfers = await transfersService.getBalanceTransfersByClientId(clientId)

    let items: Expense[] | Task[]
    if (account === 'expenses') {
      items = await expensesService.getExpensesByClientId(clientId, ['amount'])
    } else {
      items = await tasksService.getTasksByClientId(clientId, null, ['price'])
    }

    const itemTotal = getTotal(items)
    const transferTotal = getTotal(transfers)

    const fromTotal = getTotal(balanceTransfers.filter(t => t.fromAccount === account))
    const toTotal = getTotal(balanceTransfers.filter(t => t.toAccount === account))

    const balance = transferTotal - itemTotal + toTotal - fromTotal

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