import { Client } from "../models/Client.model"
import { Task } from '../models/Task.model'
import { Expense } from '../models/Expense.model'
import { Contract } from "../models/Contract.model"
import { ExpensesService } from './expenses.service'
import { TasksService } from './tasks.service'
import { TransfersService } from './transfers.service'
import { getTotal, createPDF, generateHtml } from '../utils'
import { Transfer } from "../models/Transfer.model"
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import { User } from "../models/User.model"
import createPassword from 'uniqid'
import bcrypt from 'bcryptjs'
import { Op } from "sequelize"




export class ClientsService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD
    }
  })

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
    await this.createUser(client)

    return client
  }

  public async createUser(client: Client, password?: string, isAdmin?: boolean): Promise<void> {
    //should check if the user exists
    const user = new User({
      username: client.email.split('@')[0],
      password: password ? password : createPassword(),
      role: isAdmin ? 'ADMIN' : 'USER'
    })
    if (!isAdmin) {
      user.clientId = client.id
    }

    // this.emailUserDetails(user, email)
    this.emailUserDetails(user, client, process.env.ADMIN_EMAIL)
    this.hashPassword(user, user.password)
  }

  private async hashPassword(user: User, password: string) {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) { throw err }

        user.password = hash
        await user.save()
      })
    })
  }

  public async updatePassword(userId: string, { password }) {
    const user = await User.findOne({ where: { id: userId } })
    await this.hashPassword(user, password)
    return { success: true }
  }

  private emailUserDetails(user: User, client: Client, email: string): void {
    const template = fs.readFileSync(
      path.join(__dirname, '..', '..', 'templates', 'email-template.html'), 'utf-8'
    )
    const content = generateHtml(template, {
      name: client.name, username: user.username, password: user.password
    })
    const attachments = [{
      filename: 'android-chrome-192x192.png',
      cid: 'sbinteriors-email-logo',
      path: path.join(__dirname, '..', '..', 'assets', 'android-chrome-192x192.png')
    }]

    const mailOptions = this.createEmailObject(
      email, `Your login details for the SBInteriors App`, content, true, attachments
    )
    this.transporter.sendMail(mailOptions)
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

  public async updateContract(contractItem): Promise<Contract> {
    const { clientId, serviceId, includedHours } = contractItem
    const contract = await Contract.findOne({
      where: {
        [Op.and]: [
          { clientId }, { serviceId }
        ]
      }
    })
    contract.includedHours = includedHours
    contract.save()

    return contract
  }

  public async getContract(clientId: string): Promise<Contract[]> {
    const contract = Contract.findAll({ where: { clientId } })
    return contract
  }

  public async generateReport(clientId: string) {
    const client = await this.getClientById(clientId, null, [Transfer, Task, Expense])
    this.generatePDF(client)

    //Should handle errors
    return true
  }

  private async generatePDF(client: Client) {
    // const options = { format: 'A3', orientation: 'portrait', border: '10mm' }
    const html = fs.readFileSync(path.join(__dirname, '..', '..', 'templates', 'report-template.html'), 'utf8')

    const document = {
      html, data: client, path: path.join(__dirname, '..', '..', 'reports', 'report.pdf')
    }

    await createPDF(document)
    await this.sendPDFReport(client)
  }

  private async sendPDFReport(client) {
    const mailOptions = this.createEmailObject(
      process.env.ADMIN_EMAIL,
      `Report for ${client.name}`,
      `Please find the attached report for ${client.name}.`,
      false,
      [{
        filename: `${client.name}-report.pdf`,
        path: path.join(__dirname, '..', '..', 'reports', 'report.pdf')
      }]
    )

    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
      }
    })
  }

  private createEmailObject(to: string, subject: string, content: string, isHTML: boolean = false, attachments?) {
    const mailOptions: {
      from: string, to: string, subject: string, text?: string,
      html?: string, attachments?: { filename: string, path: string }[]
    } = { from: process.env.ADMIN_EMAIL, to, subject }

    if (isHTML) {
      mailOptions.html = content
    } else {
      mailOptions.text = content
    }

    if (attachments) {
      mailOptions.attachments = attachments
    }

    return mailOptions
  }
}