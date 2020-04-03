import express from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'

class App {
  public app: express.Application
  private port: number

  constructor(controllers, port) {
    this.app = express()
    this.port = port

    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  private initializeMiddlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(cors())
    }

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
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
