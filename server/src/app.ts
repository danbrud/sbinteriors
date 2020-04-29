import express from 'express'
import * as bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import { Sequelize } from 'sequelize-typescript'
import { Client } from './models/Client.model'
import { Transfer } from './models/Transfer.model'
import { Task } from './models/Task.model'
import { Expense } from './models/Expense.model'
import { Service } from './models/Service.model'
import { TransferMethod } from './models/TransferMethod.model'
import { Contract } from './models/Contract.model'

class App {
  public app: express.Application
  private port: number

  constructor(controllers, port) {
    this.app = express()
    this.port = port

    this.initializeMiddlewares()
    this.initializeDB()

    this.initializeControllers(controllers)
    this.serveClient()
  }

  private initializeMiddlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(cors())
    }

    if (process.env.NODE_ENV === 'production') {
      console.log(path.join(__dirname, '..', '..', 'build'))
      this.app.use(express.static(path.join(__dirname, '..', '..', 'build')))
    }

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private initializeDB() {
    const sequelize = new Sequelize({
      database: process.env.DB_NAME,
      dialect: 'mysql',
      username: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD || '',
      models: [Client, Task, Expense, TransferMethod, Transfer, Service, Contract]
    })

    sequelize.sync()
  }

  private serveClient() {
    console.log(path.join(__dirname, '..', '..', 'build', 'index.html'))
    this.app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'))
    })
  }

  private initializeControllers(controllers) {
    controllers.forEach(controller => {
      this.app.use(`/api/${controller.path}`, controller.router)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on the port ${this.port}`)
    })
  }
}

export default App