import { Client } from "../models/Client.model"
import { Task } from '../models/Task.model'
import { Expense } from '../models/Expense.model'
import { Contract } from "../models/Contract.model"
import { ExpensesService } from './expenses.service'
import { TasksService } from './tasks.service'
import { TransfersService } from './transfers.service'
import { getTotal } from '../utils'
import { Transfer } from "../models/Transfer.model"
import { create } from '../generatePDF'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'



export class ClientsService {

  public async getClients(): Promise<Client[]> {
    const clients = await Client.findAll()
    return clients
  }

  public async getClientById(
    id: number | string, attributes?: string[], include?
  ): Promise<Client> {
    const client = await Client.findOne({ where: { id }, attributes, include })
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

  public async generateReport(clientId: string) {
    const client = await this.getClientById(clientId, null, [Transfer, Task, Expense])
    this.generatePDF(client)

    return client
  }

  private async generatePDF(client: Client) {
    // const options = { format: 'A3', orientation: 'portrait', border: '10mm' }
    const html = fs.readFileSync(path.join(__dirname, '..', '..', 'template.html'), 'utf8')

    const document = {
      html, data: client, path: path.join(__dirname, '..', '..', 'report.pdf')
    }

    await create(document)
    await this.sendEmail(client)
  }

  private async sendEmail(client) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: process.env.ADMIN_EMAIL,
             pass: process.env.ADMIN_EMAIL_PASSWORD
         }
    })

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Report for ${client.name}`,
      text: `Please find the attached report for ${client.name}.`,
      attachments: [{
        filename: `${client.name}-report.pdf`,
        path: path.join(__dirname, '..', '..', 'report.pdf')
      }]
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
   })
  }
}